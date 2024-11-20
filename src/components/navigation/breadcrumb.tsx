import Link from "next/link";

export default function Breadcrumb({ pages }: { pages: { title: string; path: string }[] }) {
  return (
    <nav className="mb-4 flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 font-light md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center font-medium">
            <svg
              className=" h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
          </Link>
        </li>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  className="mx-1 h-2 w-2 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {/* {index != pages.length - 1 ? ( */}
                {true ? (
                  <Link href={page.path} className=" font-medium  hover:underline md:ms-2 ">
                    {page.title}
                  </Link>
                ) : (
                  <span className=" font-medium   md:ms-2 ">{page.title}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
