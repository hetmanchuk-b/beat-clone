import getBeatsByTitle from "@/actions/getBeatsByTitle";
import Header from "@/components/header";
import SearchInput from "@/components/search-input";
import SearchContent from "@/components/search-content";

export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    title: string
  }
}

const SearchPage = async (
  {searchParams}: SearchPageProps
) => {
  const beats = await getBeatsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-100 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <div className="mb-2 flex flex-col gap-y-6 p-2">
        <h1 className="text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>
      <SearchContent beats={beats} />
    </div>
  )
}

export default SearchPage
