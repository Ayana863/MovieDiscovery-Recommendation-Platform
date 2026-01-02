import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MovieModal from '../COMPONENTS/MovieModal'




function Genre() {
  const [movieCard, setMovieCard] = useState(null)
  return (
    <>

      <div className='pt-28 px-6 min-h-screen bg-black'>

        <div className='grid grid-cols-12 gap-10 min-h-[66vh]'>

          <div className=' col-span-2 flex gap-4  flex flex-col p-10 gap-11 fixed top-28 left-4 '>
            <Link className='text-white' to="action">Action</Link>
            <Link className='text-white' to="comedy">Comedy</Link>
            <Link className='text-white' to="drama">Drama</Link>
            <Link className='text-white' to="adventure">Adventure</Link>
            <Link className='text-white' to="horror">Horror</Link>
            <Link className='text-white' to="crime">Crime</Link>
            <Link className='text-white' to="thriller">Thriller</Link>
          </div>

          <div className='col-span-10 bg-gray-700 top-60 ml-80 w-full'>
            <Outlet context={{ setMovieCard }} />
          </div>

          <MovieModal
            movie={movieCard}
            onClose={() => setMovieCard(null)} />
        </div>

      </div>
    </>
  )
}

export default Genre