import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { IMAGE_URL, MOVIE_VIDEOS_URL } from '../API/TmdbData'
import { TiDeleteOutline } from "react-icons/ti";
import { RemoveFromFavorites } from '../Slice/Favorites'
import { AddToHistory } from '../Slice/Historyslice'

function Favorites() {
  const favorites = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()
  const [video, setVideo] = useState(null)

  const playVideo = async (movie) => {
    try {
      const response = await axios.get(MOVIE_VIDEOS_URL(movie.id))
      const youtubeVideo = response.data.results.find(v => v.site === "YouTube")

      if (youtubeVideo) {
        setVideo(youtubeVideo.key)

        dispatch(AddToHistory({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          watchedAt: new Date().toISOString()
        }))
      } else {
        alert('No video available for this movie')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className='flex items-center justify-center min-h-screen'>
          <p className='text-gray-400 text-xl'>
            No Favorites Yet.
          </p>
        </div>
      )}

      {/* Video Modal */}
      {video && (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4'>
          <div className='relative w-full max-w-3xl'>
            <button
              onClick={() => setVideo(null)}
              className='absolute -top-10 right-0 text-white hover:text-red-500 transition'
            >
              <TiDeleteOutline size={30} />
            </button>

            <iframe
              className='w-full h-64 sm:h-80 md:h-96 rounded-lg'
              src={`https://www.youtube.com/embed/${video}`}
              allowFullScreen
              title="Movie Video"
            />
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className='pt-28 px-6 max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
            {favorites.map(movie => (
              <div
                key={movie.id}
                className='bg-gray-900 rounded-lg p-3 relative cursor-pointer
                           hover:scale-105 transition'
                onClick={() => playVideo(movie)}
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const confirmRemove = window.confirm(
                      'Are you sure you want to remove this movie?'
                    )
                    if (confirmRemove) {
                      dispatch(RemoveFromFavorites(movie.id))
                    }
                  }}
                  className='absolute top-2 right-2 bg-black/70 text-white
                             hover:text-red-500 rounded-full p-1'
                >
                  <TiDeleteOutline size={30} />
                </button>

                <img
                  src={`${IMAGE_URL}${movie.poster}`}
                  alt={movie.title}
                  className='rounded-lg h-64 w-full object-cover'
                />

                <h3 className='mt-2 font-semibold truncate'>
                  {movie.title}
                </h3>

                <p className='text-amber-400 text-sm'>
                  ⭐ {movie.rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Favorites
