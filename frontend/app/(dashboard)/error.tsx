'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex items-center justify-center pt-40">
        <div className="bg-white gap-5 flex flex-col rounded shadow-md p-10 transition-transform w-96 text-center">
      <h2 className=''>Something went wrong!</h2>
      <button className="bg-indigo-500 text-white py-3 px-6 rounded -md cursor-pointer transition-colors duration-300 hover:bg-indigo-500 px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-400 md:text-base"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
      </div>
    </div>
  )
}