import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DISCOVER_MOVIES_URL, IMAGE_URL } from '../API/TmdbData'
import { CiHeart } from 'react-icons/ci'
import { useOutletContext } from 'react-router-dom'


function Crime() {
  const [crime, setCrime] = useState([])
  const { setMovieCard } = useOutletContext()


  useEffect(() => {

    const CrimeMovies = async () => {
      try {
        const response = await axios.get(`${DISCOVER_MOVIES_URL}&with_genres=80`)

        setCrime(response.data.results)

      } catch (err) {
        console.log(err);

      }
    }
    CrimeMovies()
  }, [])
  return (
    <>
      <h2 className='mt-4 text-white font-bold text-3xl px-6'>
        Crime
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-7 p-10'>
        {crime.map((movie) => (
          <div
            key={movie.id}
            className='bg-gray-900 rounded-xl p-3 shadow-lg'
          >

            <div className='relative'>
              <img
                src={
                  `${IMAGE_URL}${movie.poster_path}`

                }
                alt={movie.title}
                className='rounded-lg w-full h-80 object-cover'
              />

              {/* Favorite Icon */}
              <button
                className='absolute top-2 right-2 text-white bg-black
                                 hover:text-red-500 p-1 rounded-full transition'
                title='Add to Favorites'
              >
                <CiHeart className='text-3xl' />
              </button>
            </div>

            <p className='text-white mt-3 text-md font-semibold truncate'>
              {movie.title}
            </p>

            <div className='flex justify-between items-center mt-2 text-xs'>
              <span className='text-gray-400'>
                {movie.release_date}
              </span>

              <span className='text-amber-400 font-semibold'>
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className='mt-3'>
              <button onClick={() => { setMovieCard(movie) }} className='w-full px-3 py-1 text-md bg-amber-500 text-black rounded-md hover:bg-amber-600 transition'>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Crime