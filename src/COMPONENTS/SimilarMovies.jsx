import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { IMAGE_URL, SIMILAR_MOVIES_URL, MOVIE_VIDEOS_URL } from "../API/TmdbData"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { AddToHistory } from "../Slice/Historyslice"
import { IoIosClose } from "react-icons/io";

function SimilarMovies({ movieId, setMovieCard }) {
  const [similar, setSimilar] = useState([])
  const [playingVideo, setPlayingVideo] = useState(null)
  const scrollRef = useRef(null)

  const dispatch = useDispatch()
  const FavoritesItems = useSelector(state => state.favorites.value)

  useEffect(() => {
    if (!movieId)
      return

    const fetchSimilar = async () => {
      try {
        const res = await axios.get(SIMILAR_MOVIES_URL(movieId))
        setSimilar(res.data.results)
      } catch (err) {
        console.log("Failed to load similar movies")

      }
    }

    fetchSimilar()
  }, [movieId])

  const toggleFavorite = (movie) => {
    const exists = FavoritesItems.find(item => item.id === movie.id)
    if (exists) dispatch(RemoveFromFavorites(movie.id))
    else dispatch(AddToFav({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rating: movie.vote_average
    }))
  }

  const playMovie = async (movie) => {
    try {
      const res = await axios.get(MOVIE_VIDEOS_URL(movie.id))
      const trailer = res.data.results.find(v => v.site === "YouTube")
      if (trailer) {
        setPlayingVideo(trailer.key)

        // Add to watch history
        dispatch(AddToHistory({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          rating: movie.vote_average,
          watchedAt: new Date().toISOString()
        }))
      } else {
        alert("No video available")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -400, behavior: "smooth" })
  const scrollRight = () => scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })

  if (similar.length === 0)
    return (
      <p p className='text-gray-300 mt-4' > No similar movies found.</p >
    )

  return (
    <div className='relative py-6'>
      {/* Header */}
      <div className='flex items-center justify-between px-6 mb-4'>
        <h2 className='text-white text-2xl font-bold'>Similar Movies</h2>
        <div className='flex gap-2'>
          <button onClick={scrollLeft} className='bg-black text-white p-2 rounded-full'><FaChevronLeft /></button>
          <button onClick={scrollRight} className='bg-black text-white p-2 rounded-full'><FaChevronRight /></button>
        </div>
      </div>

      {/* Movie Row */}
      <div ref={scrollRef} className='flex gap-x-6 px-6 overflow-hidden select-none'>
        {similar.map(movie => (
          <div key={movie.id} className='min-w-[180px] bg-black rounded-xl shadow-xl hover:scale-105 transition relative'>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(movie)}
              className='absolute top-2 right-2 bg-black p-1 rounded-full'
            >
              <CiHeart className={`text-3xl ${FavoritesItems.find(item => item.id === movie.id) ? "text-red-500" : "text-white"}`} />
            </button>


            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className='w-full h-72 object-cover rounded-t-xl cursor-pointer'
              onClick={() => playMovie(movie)}
            />

            {/* Info */}
            <div className="p-3">
              <h3 className='text-white text-sm font-semibold truncate'>{movie.title}</h3>
              <span className='text-yellow-400 text-xs'>⭐ {movie.vote_average}</span>
              <button
                onClick={() => setMovieCard(movie)}
                className='w-full mt-3 bg-amber-500 text-black py-1 rounded'
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {playingVideo && (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
          <div className='relative w-[90%] md:w-[60%]'>
            <button
              onClick={() => setPlayingVideo(null)}
              className='absolute -top-10 right-0 text-white hover:text-red-500 transition text-2xl'
            >
              <IoIosClose />
            </button>
            <iframe
              className="w-full h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${playingVideo}`}
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SimilarMovies
