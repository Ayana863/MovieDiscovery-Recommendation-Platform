import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../Slice/SearchSlice';





function Search() {
  const searchValue = useSelector(state => state.search.value)
  const dispatch=useDispatch()
  return (
    <>


      <input
        onChange={(e) => dispatch(searchItems(e.target.value))}
        value={searchValue}
        type="text" placeholder="Explore..."
        className='bg-transparent outline-none px-2 py-1 w-44 focus:w-56 transition-[width] duration-300'
      />
      <FaSearch className='text-gray-400' />
    </>
  )
}

export default Search