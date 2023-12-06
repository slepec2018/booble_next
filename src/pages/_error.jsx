import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchHeader from '@/components/SearchHeader';

export default function Error({ error }) {
  const router = useRouter();

  useEffect(() => { 
    console.log(error);
  }, [error, reset]);

  function reset() { 
    router.push('/');
  }

  return (
    <>
      <SearchHeader />
      <div
        className="flex flex-col items-center justify-center pt-10"
      >
        <h1
          className="text-3xl mb-4"
        >
          Something went wrong
        </h1>
        <button
          onClick={() => reset()}
          className="text-blue-500"
        >
          Try again
        </button>
      </div>
    </>
  )
}
