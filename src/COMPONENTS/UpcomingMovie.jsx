import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IMAGE_URL, UPCOMING_MOVIES_URL } from "../API/TmdbData";





function UpcomingMovies() {
  const [movies, setMovies] = useState([])
  const scrollRef = useRef(null)



  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await axios.get(UPCOMING_MOVIES_URL)
        setMovies(response.data.results)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUpcoming()
  }, [])


  // Continuous auto-scroll
  useEffect(() => {
    if (!movies.length) {
      return
    }

    const scrollContainer = scrollRef.current
    let scrollSpeed = 3

    const scroll = () => {
      // Move container horizontally
      scrollContainer.scrollLeft += scrollSpeed
      // Reset scroll position for infinite loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      // Continue animation
      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
  }, [movies])



  return (
    <div className='relative py-6'>
      <h2 className='text-white text-xl font-bold px-6 mb-4'>
        UPCOMING
      </h2>

      <div
        ref={scrollRef}
        className='flex gap-x-6 px-6 py-2 overflow-hidden'
      >
        {[...movies, ...movies].map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className='min-w-[180px] bg-[#0b1c50] rounded-xl shadow-xl
                       hover:scale-105 transition-transform duration-300
                       flex-shrink-0'
          >
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

                <span className='text-gray-400'>
                  {movie.release_date?.slice(0, 4)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingMovies
