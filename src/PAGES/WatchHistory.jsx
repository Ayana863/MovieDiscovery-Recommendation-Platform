import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { IMAGE_URL, MOVIE_VIDEOS_URL } from '../API/TmdbData'
import { TiDeleteOutline } from "react-icons/ti";
import { RemoveFromHistory } from '../Slice/Historyslice';


function WatchHistory() {

  const history = useSelector(state => state.history.value)
  const dispatch = useDispatch()


  const [video, setVideo] = useState(null)

  const playVideo = async (movieId) => {
    try {
      const response = await axios.get(MOVIE_VIDEOS_URL(movieId))
      const youtubeVideo = response.data.results.find(v => v.site === "YouTube")

      if (youtubeVideo) {
        setVideo(youtubeVideo.key)
      }
    } catch (err) {
      console.log("Video not found")
    }
  }


  return (
    <>
      <div className='min-h-screen bg-black'>
        {
          history.length === 0 && (
            <p className='text-center pt-48 text-gray-400 text-xl'>
              No Watch History Yet.
            </p>
          )
        }
        {video && (
          <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
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



        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-8 mt-24'>
          {history.map(movie => (
            <div
              key={movie.id}
              className='bg-gray-900 rounded-lg p-3 relative cursor-pointer'
              onClick={() => playVideo(movie.id)}
            >

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const confirmRemove = window.confirm("Are you sure you want to remove this movie?")

                  if (confirmRemove) {
                    dispatch(RemoveFromHistory(movie.id))
                  }
                }}
                className='absolute top-2 right-2 bg-black/70 text-white
                         hover:text-red-500 rounded-full p-1'
              >
                <TiDeleteOutline size={35} />
              </button>

              <img
                src={`${IMAGE_URL}${movie.poster}`}
                className='rounded-lg h-64 w-full object-cover'
                alt={movie.title}
              />

              <h3 className='text-white mt-2 font-semibold truncate'>
                {movie.title}
              </h3>

              <p className='text-gray-400 text-sm'>
                ⭐ {movie.rating}
              </p>

              <p className='text-gray-100 text-xs mt-1'>
                Watched on: {new Date(movie.watchedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WatchHistory
