from __future__ import annotations

import json
from typing import List, Optional

import strawberry
from config import database
from utils import Version


def _get_link_with_version(url: str, version: Version) -> str:
    return (
        url.replace("{version}", str(version))
        .replace("{major}", str(version.major or ""))
        .replace("{minor}", str(version.minor or ""))
    )


async def find_version(
    slug: str, version: Optional[str] = None
) -> Optional[FindVersionResult]:
    software_query = """
        SELECT slug, name, links FROM Software
        WHERE slug LIKE :q
            OR :q2 IN (
                select value
                from json_each(aliases)
            )
    """
    data = await database.fetch_one(software_query, {"q": slug, "q2": slug})

    if data is None:
        return None

    slug, software_name, links = data
    links = json.loads(links)

    """if slug is None:
        loop = asyncio.get_event_loop()
        loop.create_task(Notion.increment_counter(slug_q))
        return await four_oh_four(request)
    """

    query = """
        SELECT major, minor, revision, build FROM Version
        INNER JOIN Software on Software.id = Version.Software
        WHERE Software.slug = :slug {}
        ORDER BY
            Version.major DESC,
            Version.minor DESC,
            Version.revision DESC,
            Version.build DESC
    """

    where = ""
    values = {"slug": slug}

    if version:
        if not (filter_version := Version.from_string(version)):
            return None

        if filter_version.major is not None:
            where += " AND Version.major = :major"
            values["major"] = filter_version.major
        if filter_version.minor is not None:
            where += " AND Version.minor = :minor"
            values["minor"] = filter_version.minor
        if filter_version.revision is not None:
            where += " AND Version.revision = :revision"
            values["revision"] = filter_version.revision
        if filter_version.build is not None:
            where += " AND Version.build like :build"
            values["build"] = f"{filter_version.build}%"

    query = query.format(where)

    result = await database.fetch_one(query, values)

    if result is None:
        return None

    version = Version(*result)

    links = [
        Link(
            url=_get_link_with_version(link["url"], version),
            name=link["name"],
        )
        for link in links
    ]

    return FindVersionResult(
        latest_version=str(version),
        software=Software(name=software_name, slug=slug, links=links),
    )


@strawberry.type
class Link:
    url: str
    name: str


@strawberry.type
class Software:
    name: str
    slug: str
    links: List[Link]


@strawberry.type
class FindVersionResult:
    latest_version: str
    software: Software


@strawberry.type
class Query:
    find_version: Optional[FindVersionResult] = strawberry.field(resolver=find_version)


schema = strawberry.Schema(query=Query)
