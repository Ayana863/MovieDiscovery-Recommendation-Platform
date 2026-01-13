import React, { useState } from "react"
import { IMAGE_URL, MOVIE_VIDEOS_URL } from "../API/TmdbData"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { AddToHistory } from "../Slice/Historyslice"
import SimilarMovies from "./SimilarMovies"
import { useNavigate } from "react-router-dom"
import { IoIosClose } from "react-icons/io";


function MovieModal({ movie, onClose, setMovieCard }) {
  const [trailerKey, setTrailerKey] = useState(null)
  const [showSimilar, setShowSimilar] = useState(false)

  const dispatch = useDispatch()
  const FavoritesItems = useSelector(state => state.favorites.value)
  const navigate = useNavigate()

  if (!movie) return null

  const handleWatchMovie = async () => {
    try {
      const res = await axios.get(MOVIE_VIDEOS_URL(movie.id))
      const trailer = res.data.results.find(
        v => v.site === "YouTube" && v.type === "Trailer"
      )

      if (trailer) {
        setTrailerKey(trailer.key)

        dispatch(AddToHistory({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          rating: movie.vote_average,
          releaseDate: movie.release_date,
          watchedAt: new Date().toISOString()
        }))
      } else {
        alert("Trailer not available")
      }
    } catch (err) {
      console.error("Failed to load trailer", err)
    }
  }

  const toggleFavorite = () => {
    const exists = FavoritesItems.find(item => item.id === movie.id)
    if (exists) dispatch(RemoveFromFavorites(movie.id))
    else dispatch(AddToFav({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rating: movie.vote_average
    }))
  }

  return (
    <div className='fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto px-4 py-10'>

      <div className='bg-gray-900 text-white w-full max-w-5xl rounded-xl p-6 relative'>

        {/* Close Button */}
        <button
          onClick={() => {
            setTrailerKey(null)
            onClose()
          }}
          className='absolute top-4 right-4 text-5xl hover:text-red-500 transition'
        >
          <IoIosClose  />
        </button>

        {/* video */}
        {trailerKey ? (
          <iframe
            className='w-full h-56 sm:h-72 md:h-96 rounded-lg'
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allowFullScreen
            title="Movie Trailer"
          />
        ) : (
          <>
            {/* Movie details */}
            <div className='flex flex-col md:flex-row gap-6'>

       
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className='w-full md:w-48 rounded-lg object-cover'
              />

            
              <div className='flex-1'>
                <h2 className='text-2xl md:text-3xl font-bold'>
                  {movie.title}
                </h2>

                <p className='text-gray-400 mt-3 text-sm md:text-base'>
                  {movie.overview}
                </p>

                <p className='mt-3 text-amber-400'>
                  ⭐ {movie.vote_average}
                </p>

                <p className='text-gray-400 mt-1'>
                  Release: {movie.release_date}
                </p>

                {/* Buttons */}
                <div className='flex flex-wrap gap-4 mt-6'>

                  <button
                    onClick={handleWatchMovie}
                    className='bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition'
                  >
                    Watch Movie
                  </button>

                  <button
                    onClick={toggleFavorite}
                    className='bg-black border border-gray-600 px-5 py-2 rounded-full hover:border-white transition'
                  >
                    {FavoritesItems.find(item => item.id === movie.id)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>

                  <button
                    onClick={() => setShowSimilar(!showSimilar)}
                    className='bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 transition'
                  >
                    {showSimilar ? "Hide Similar" : "Similar Movies"}
                  </button>
                  <button
                    onClick={() => navigate('/rate', { state: { movie } })}
                    className='bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition'
                  >
                    Rate This Movie
                  </button>

                </div>
              </div>
            </div>

            {/* Similar Movies */}
            {showSimilar && (
              <div className='mt-10'>
                <SimilarMovies
                  movieId={movie.id}
                  setMovieCard={setMovieCard}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MovieModal
