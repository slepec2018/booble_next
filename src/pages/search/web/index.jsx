import SearchHeader from "@/components/SearchHeader"

export default function WebSearchPage({list}) {
  return (
    <>
      <SearchHeader />
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

    return {
      props: {
        list: results,
        revalidate: 10
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
