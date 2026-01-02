import React from 'react'
import { FaSearch } from 'react-icons/fa';


function Search() {
  return (
    <>


      <input
        type="text"
        placeholder="Explore..."
        className='bg-transparent outline-none px-2 py-1 w-44 focus:w-56 transition-[width] duration-300'
      />
      <FaSearch className='text-gray-400' />
    </>
  )
}

export default Search