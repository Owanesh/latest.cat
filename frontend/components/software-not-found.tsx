import Link from "next/link";

const Icon = () => (
  <svg width={50} height={43} fill="none" viewBox="0 0 50 43" className="inline-block mr-4">
    <path
      fill="#000"
      d="M10.527 10.526h2.632v2.632h-2.632zM31.58 10.526h2.632v2.632H31.58zM13.158 13.158h2.632v2.632h-2.632zM34.211 13.158h2.632v2.632h-2.632zM10.527 15.79h2.632v2.632h-2.632zM31.58 15.79h2.632v2.632H31.58zM15.79 10.526h2.632v2.632H15.79zM36.843 10.526h2.632v2.632h-2.632zM15.79 15.79h2.632v2.632H15.79zM18.421 21.053h2.632v2.632h-2.632zM36.843 34.211h2.632v2.632h-2.632zM15.79 31.579h2.632v2.632H15.79zM26.316 21.053h2.632v2.632h-2.632z"
    />
    <path
      fill="#000"
      d="M21.054 23.684h5.263v2.632h-5.263zM47.37 2.631H2.631V0H47.37zM47.37 42.106H2.631v-2.632H47.37zM50 2.96v36.514H47.37V2.96zM2.631 2.96v36.514H0V2.96zM31.58 31.579h5.263v2.632H31.58zM18.421 28.947h13.158v2.632H18.421zM36.843 15.79h2.632v2.632h-2.632z"
    />
  </svg>
);

export const SoftwareNotFound = () => (
  <div
    className="
      border text-4xl font-heading font-black bg-gray border-black rounded-full shadow-drop px-12 py-8
      text-center inline-block text-black
    "
  >
    <Icon />
    Sorry, no results, try another{" "}
    <Link href="/">
      <a className="text-blue hover:underline">search</a>
    </Link>
  </div>
);
