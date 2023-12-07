import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";

export default function PaginationButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const [term, setTerm] = useState('');
  const [index, setIndex] = useState('');


  useEffect(() => {
    const { searchTerm, start } = router.query;

    if (searchTerm) {
      setTerm(searchTerm);
    }

    if (start) { 
      setIndex(+start);
    }

  }, [router.query.searchTerm, router.query.start]);

  return (
    <div
      className="text-blue-700 flex px-10 pb-4 justify-between sm:justify-start sm:space-x-44 sm:px-0"
    >
      {index >= 10 && (
        <Link
          href={`${pathname}?searchTerm=${term}&start=${index - 10}`}
        >
          <div
            className="flex flec-col cursor-pointer items-center hover:underline"
          >
            <BsChevronLeft
              className="h-5 "
            />
            <p>
              Previous
            </p>
          </div>
        </Link>
      )}
      {index <= 90 && (
        <Link
          href={`${pathname}?searchTerm=${term}&start=${index + 10}`}
        >
          <div
            className="flex flec-col cursor-pointer items-center hover:underline"
          >
            <BsChevronRight
              className="h-5 "
            />
            <p>
              Next
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}
