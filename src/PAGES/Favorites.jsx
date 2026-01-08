import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { IMAGE_URL, MOVIE_VIDEOS_URL } from '../API/TmdbData'
import { TiDeleteOutline } from "react-icons/ti";
import { RemoveFromFavorites } from '../Slice/Favorites'
import { AddToHistory } from '../Slice/Historyslice';


function Favorites() {
  const favorites = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()
  const [video, setVideo] = useState(null)

  // Play YouTube video
  const playVideo = async (movie) => {
    try {
      const response = await axios.get(MOVIE_VIDEOS_URL(movie.id))
      const youtubeVideo = response.data.results.find(v => v.site === "YouTube")

      if (youtubeVideo) {
        setVideo(youtubeVideo.key)

        // added to watchhistory
        dispatch(AddToHistory({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating,
          watchedAt: new Date().toISOString()
        }))

      } else {
        alert("No video available for this movie ")
      }
    } catch (err) {
      console.log(err)

    }
  }



  return (
    <>
      <div className='min-h-screen bg-black'>

        {favorites.length === 0 && (
          <p className='text-center pt-48 text-gray-400 text-xl'>
            No Favorites Yet.
          </p>
        )}
        {video && (
          <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 '>
            <div className='relative w-[90%] md:w-[60%]'>
              <button
                onClick={() => setVideo(null)}
                className='absolute -top-10 right-0 text-white hover:text-red-500 transition'
              >
                <TiDeleteOutline size={30} />
              </button>

              <iframe
                className='w-full h-96 rounded-lg'
                src={`https://www.youtube.com/embed/${video}`}
                allowFullScreen
                title="Movie Video"
              />
            </div>
          </div>
        )}



        <div className='pt-28 px-6 grid grid-cols-2 md:grid-cols-4 gap-6'>
          {favorites.map(movie => (
            <div
              key={movie.id}
              className='bg-gray-900 rounded-lg p-3 relative cursor-pointer hover:scale-105 transition'
              onClick={() => playVideo(movie)}
            >
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const confirmRemove = window.confirm("Are you sure you want to remove this movie?")

                  if (confirmRemove) {
                    dispatch(RemoveFromFavorites(movie.id))
                  }

                }}
                className='absolute top-2 right-2 bg-black/70 text-white
                         hover:text-red-500 rounded-full p-1'
              >
                <TiDeleteOutline size={35} />
              </button>

              <img
                src={`${IMAGE_URL}${movie.poster}`}
                alt={movie.title}
                className='rounded-lg h-64 w-full object-cover'
              />

              <h3 className='text-white mt-2 font-semibold truncate'>
                {movie.title}
              </h3>

              <p className='text-amber-400 text-sm'>
                ⭐ {movie.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Favorites
