import React, { useState } from 'react';
import { IMAGE_URL, MOVIE_VIDEOS_URL } from '../API/TmdbData';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';


function MovieModal({ movie, onClose }) {
    const [videos, setVideos] = useState(null)

    if (!movie) {
        //  nothing renders
        return null
    }

    // fetching a movie video from TMDB
    const getVideo = async () => {
        try {
            const response = await axios.get(MOVIE_VIDEOS_URL(movie.id))
            const videoResult = response.data.results.find(vdo => vdo.site === 'YouTube')
            if (videoResult) {
                // key = the YouTube video id
                setVideos(videoResult.key)
            } else {
                toast.error("Sorry! No video available on YouTube")
            }
        } catch (err) {
            // console.log(err)
            toast.error("Failed to fetch video!")
        }
    }

    return (
        <>
            <div className='fixed inset-0 bg-black z-50 flex items-center justify-center p-4'>
                <div className='bg-gray-900 rounded-xl w-[90%] md:w-[60%] p-6 relative'>

                    <button onClick={() => {
                        setVideos(null)
                        onClose()
                    }}
                        className='absolute top-4 right-4 text-white text-xl hover:text-red-500 transition'>
                        <FaTimes />
                    </button>

                    {/* conditional rendering ,  If  video is available, display the video card . otherwise, display the movie details.  */}
                    {videos ? (
                        <iframe
                            className='w-full md:h-96 rounded-lg'
                            src={`https://www.youtube.com/embed/${videos}`}
                            title="Movie Trailer"
                            allowFullScreen
                        />
                    ) : (
                        <div className='flex flex-col md:flex-row gap-6'>
                            <img
                                src={`${IMAGE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className='w-full md:w-60 rounded-lg'
                            />

                            {/* Details */}
                            <div className='flex-1'>
                                <h2 className='text-white text-3xl font-bold'>{movie.title}</h2>

                                <p className='text-gray-300 mt-4'>{movie.overview}</p>

                                <p className='text-yellow-400 mt-4 font-semibold'>⭐ {movie.vote_average}</p>

                                <p className='text-gray-400 mt-2'>Release: {movie.release_date}</p>

                                <button
                                    onClick={getVideo}
                                    className='mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
                                >
                                    Watch Video
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default MovieModal






