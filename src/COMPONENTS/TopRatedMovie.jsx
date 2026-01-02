import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IMAGE_URL, TOP_RATED_MOVIES_URL } from "../API/TmdbData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

function TopRatedMovie({ setMovieCard }) {
  const [topRated, setTopRated] = useState([])
  const scroll = useRef(null)


  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const response = await axios.get(TOP_RATED_MOVIES_URL)
        setTopRated(response.data.results)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTopRated()
  }, [])


  const scrollLeft = () => {
    if (scroll.current) {
      scroll.current.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scroll.current) {
      scroll.current.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  return (
    <div className='relative py-6'>
      {/* Header */}
      <div className='flex items-center justify-between px-6 mb-4'>
        <h2 className='text-white text-xl font-bold'>Top Rated Movies</h2>

        <div className='flex gap-2'>
          <button
            onClick={scrollLeft}
            className='bg-black hover:bg-black text-white p-2 rounded-full shadow-lg'>
            <FaChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className='bg-black hover:bg-black text-white p-2 rounded-full shadow-lg' >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Movie Row */}
      <div

        ref={scroll}
        className='flex gap-x-6 px-6 overflow-hidden select-none' >
        {topRated.map((movie) => (
          <div

            key={movie.id}
            className='relative min-w-[180px] bg-[#0b132b] rounded-xl shadow-xl
                       hover:scale-105 transition-transform duration-300 flex-shrink-0' >


            {/* Favorite Icon */}
            <button
              className='absolute top-2 right-2 text-white bg-black/70
                         hover:text-red-500 p-1 rounded-full transition z-10'  >
              <CiHeart className='text-3xl' title="Add to Favorite" />
            </button>


            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className='w-full h-72 object-cover rounded-t-xl'
            />


            <div className='p-3'>

              <h3 className='text-white text-sm font-semibold truncate'>
                {movie.title}
              </h3>


              <div className='flex items-center justify-between mt-2 text-xs'>
                <span className='text-yellow-400'>
                  ⭐ {movie.vote_average}
                </span>
              </div>


              <div className='mt-3'>
                <button
                  onClick={() => setMovieCard(movie)}
                  className='w-full px-3 py-1 text-md bg-amber-500 text-black
                             rounded-md hover:bg-amber-600 transition' >
                  Read More
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default TopRatedMovie
