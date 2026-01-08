import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DISCOVER_MOVIES_URL, IMAGE_URL } from '../API/TmdbData'
import { CiHeart } from 'react-icons/ci'
import { useOutletContext } from 'react-router-dom'
import { AddToFav } from '../Slice/Favorites'
import { useDispatch, useSelector } from 'react-redux'


function Horror() {
  const { setMovieCard } = useOutletContext()
  const [horror, setHorror] = useState([])

  // redux states
  const searchValue = useSelector(state => state.search.value)
  const FavoritesItems = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()


  // fetch movies
  useEffect(() => {

    const HorrorMovies = async () => {
      try {
        const response = await axios.get(`${DISCOVER_MOVIES_URL}&with_genres=27`)

        setHorror(response.data.results)

      } catch (err) {
        console.log(err);

      }
    }
    HorrorMovies()
  }, [])


  // Search filter 
  const filteredHorroreMovies = horror.filter(movie =>
    (movie.title || '').toLowerCase().includes(searchValue.toLowerCase())
  )


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
    <>

      <h2 className="mt-4 text-white font-bold text-3xl px-6">
        Horror
      </h2>

      {filteredHorroreMovies.length === 0 && searchValue && (
        <p className="text-center text-gray-400 mt-20">
          No movies found
        </p>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-7 p-10'>
        {filteredHorroreMovies.map(movie => (
          <div
            key={movie.id}
            className='bg-gray-900 rounded-xl p-3 shadow-lg'
          >
            <div className='relative'>
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className='rounded-lg w-full h-80 object-cover'
              />

              {/* Favorite Icon */}
              <button
                onClick={() => toggleFavorite(movie)}
                className='absolute top-2 right-2 bg-black p-1 rounded-full transition'
                title='Add to Favorites'
              >
                <CiHeart
                  className={`text-3xl ${FavoritesItems.find(item => item.id === movie.id)
                      ? 'text-red-500'
                      : 'text-white'
                    }`}
                />
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
              <button
                onClick={() => setMovieCard(movie)}
                className='w-full px-3 py-1 text-md bg-amber-500 text-black rounded-md hover:bg-amber-600 transition'
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default Horror