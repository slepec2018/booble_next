import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RxCross2 } from 'react-icons/rx';
import { BsFillMicFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBox() {
  const router = useRouter();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const { searchTerm } = router.query;

    if (searchTerm) {
      setTerm(searchTerm);
    }

  }, [router.query.searchTerm]);

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (!term.trim()) return;

    router.push(`/search/web?searchTerm=${term}`);
  };

  return (
    <form
      className='flex border border-gray-200 rounded-full shadow-lg px-6 py-3 ml-10 mr-5 flex-grow max-w-3xl items-center'
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full focus:outline-none"
        defaultValue={term}
        onChange={handleInputChange}
      />
      <RxCross2
        className="text-2xl text-gray-500 cursor-pointer sm:mr-2"
        onClick={() => setTerm('')}
      />
      <BsFillMicFill
        className="hidden sm:inline-flex text-4xl text-blue-500 pl-4 border-l-2 border-gray-300 mr-3"
      />
      <AiOutlineSearch
        className="text-2xl hidden sm:inline-flex text-blue-500 cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  )
}
