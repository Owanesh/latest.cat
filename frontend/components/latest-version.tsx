export const LatestVersion = ({
  software,
  version,
  requestedVersion,
}: {
  software: string;
  version: string;
  requestedVersion?: string;
}) => (
  <div
    className="
      border text-4xl font-heading font-black bg-mint border-black rounded-3xl md:rounded-full shadow-drop px-12 py-8
      text-center inline-block text-black mb-10
    "
  >
    latest version for{" "}
    <span className="text-blue">
      {software}
      {requestedVersion ? `@${requestedVersion}` : ""}
    </span>{" "}
    is <span className="text-blue">{version}</span>
  </div>
);
