import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IMAGE_URL, TRENDING_MOVIES_URL } from "../API/TmdbData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { AddToFav } from "../Slice/Favorites";
import { useDispatch, useSelector } from "react-redux";




function TrendingMovies({ setMovieCard }) {
  const [TrendingMovies, setTrendingMovie] = useState([])
  const scroll = useRef(null)

  const FavoritesItems = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(TRENDING_MOVIES_URL)
        setTrendingMovie(response.data.results)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTrendingMovies()
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



  // function for favorites
  const toggleFavorite = (movie) => {
    const exists = FavoritesItems.find(item => item.id === movie.id)

    if (exists) {
      dispatch(RemoveFromFavorites(movie.id))
    } else {
      dispatch(AddToFav({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        rating: movie.vote_average
      }))
    }
  }


  return (
    <div className='relative py-6'>
      {/* Header */}
      <div className='flex items-center justify-between px-6 mb-4'>
        <h2 className='text-white text-2xl font-bold'>Trending Movies</h2>

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
        {TrendingMovies.map((movie) => (

          <div

            key={movie.id}
            className='relative min-w-[180px] bg-[#0b132b] rounded-xl shadow-xl
                       hover:scale-105 transition-transform duration-300 flex-shrink-0' >


            {/* Favorite Icon */}
            <button
              onClick={() => toggleFavorite(movie)}
              className='absolute top-2 right-2 text-white bg-black
                                       hover:text-red-500 p-1 rounded-full transition'
              title='Add to Favorites'
            >
              <CiHeart className={`text-3xl ${FavoritesItems.find(item => item.id === movie.id)
                ? 'text-red-500'
                : 'text-white'
                }`} />
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

export default TrendingMovies
