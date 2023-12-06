import SearchHeader from "@/components/SearchHeader"
import Link from "next/link";

export default function WebSearchPage({list}) {
  return (
    <>
      <SearchHeader />
      {!list || list.length === 0 && (
        <div
          className="flex flex-col justify-center items-center pt-10"
        >
          <h1
            className="text-3xl mb-4"
          >
            No results found
          </h1>
          <p
            className="text-lg"
          >
            Try searching for something else or go back to the homepage{" "} 
            <Link
              href="/"
              className="text-blue-500"
            >
              Home
            </Link>
          </p>
        </div>
      )}
      {list && list.map((result) => (
        <h1>
          {result.title}
        </h1>
      ))}
    </>
  )
}

export async function getServerSideProps(context) { 
  const { query } = context;
  const { searchTerm } = query;

  try {
    const request = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}`);
    if (!request.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await request.json();
    const results = data.items;

    if (!results) {
      console.log("No results found");
      return {
        props: {
          list: [],
          revalidate: 1
        },
      };
    }

    return {
      props: {
        list: results,
        revalidate: 1
      },
    };
  } catch (error) { 
    if (context.res) {
      context.res.writeHead(302, {
        Location: '/_error',
      });
      context.res.end();
    }

    return {
      props: { error: error.message },
    };
  }
}
