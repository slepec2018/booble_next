import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { AiOutlineSearch, AiOutlineCamera } from "react-icons/ai";

export default function SearchHeaderOptions() {
  const pathname = usePathname();
  const router = useRouter();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const { searchTerm } = router.query;

    if (searchTerm) {
      setTerm(searchTerm);
    }

  }, [router.query.searchTerm]);

  const selectTab = (tab) => { 
    router.push(`/search/${tab === "Images" ? "image" : "web"}?searchTerm=${term}`);
  }

  return (
    <div
      className="flex space-x-2 select-none border-b w-full justify-center lg:justify-start lg:pl-52 text-gray-700 text-sm"
    >
      <div
        onClick={() => selectTab("All")}
        className={`flex items-center space-x-1 border-b-4 border-transparent active:text-blue-500 cursor-pointer pb-3
        px-2 ${pathname === "/search/web" && "!text-blue-600 !border-blue-600"}`}
      >
        <AiOutlineSearch
          className="text-md"
        />
        <p>All</p>
      </div>
      <div
        onClick={() => selectTab("Images")}
        className={`flex items-center space-x-1 border-b-4 border-transparent active:text-blue-500 cursor-pointer pb-3
        px-2 ${pathname === "/search/image" && "!text-blue-600 !border-blue-600"}`}
      >
        <AiOutlineCamera
          className="text-md"
        />
        <p>Images</p>
      </div>
    </div>
  )
}
