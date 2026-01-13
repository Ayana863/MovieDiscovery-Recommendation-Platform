import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../API/TmdbData'
import { FaStar } from 'react-icons/fa';

function UserRatingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { movie } = location.state || {}

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")
  const [userRatings, setUserRatings] = useState([])

  if (!movie) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        No movie selected for rating.
      </div>
    )
  }

  const handleSubmit = () => {
    if (!rating) {
      alert("Please select a rating")
      return
    }

    const newRating = {
      movieTitle: movie.title,
      rating,
      review,
      ratedAt: new Date().toISOString()
    }

    // Add or update rating for this movie
    setUserRatings(prev => {
      const exists = prev.find(r => r.movieTitle === movie.title)
      if (exists) {
        return prev.map(r => r.movieTitle === movie.title ? newRating : r)
      } else {
        return [...prev, newRating]
      }
    })

    alert(`You rated "${movie.title}" ${rating} ⭐`)
    setRating(0)
    setHover(0)
    setReview("")
  }

  // find existing rating for this movie
  const existingRating = userRatings.find(r => r.movieTitle === movie.title)

  return (
    <section className='min-h-screen bg-[#001d3d] text-white flex flex-col items-center px-6 py-20'>

      <button
        onClick={() => navigate(-1)}
        className='self-start mb-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition'
      >
        Back
      </button>

      <div className='flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg'>
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          className='w-48 md:w-60 rounded-lg'
        />
        <div className='flex-1'>
          <h2 className='text-3xl md:text-4xl font-bold text-amber-400'>{movie.title}</h2>
          <p className='text-gray-400 mt-2'>Release: {movie.release_date || 'N/A'}</p>
          <p className='text-gray-300 mt-2'> Rating: {movie.vote_average || 'N/A'}</p>
        </div>
      </div>

      <div className='mt-10 w-full max-w-lg bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg'>
        <h3 className='text-2xl font-bold text-amber-400 text-center'>Rate This Movie</h3>

        <div className='flex justify-center gap-2 mt-6'>
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar
              key={star}
              size={32}
              className={`cursor-pointer transition ${(hover || rating) >= star ? "text-amber-400" : "text-gray-500"}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <p className='text-center mt-2 text-gray-300'>
          {rating ? `You rated: ${rating} / 5` : "Select a rating"}
        </p>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review (optional)"
          className='w-full mt-6 p-3 bg-black/40 rounded-lg outline-none text-sm resize-none text-white'
          rows="4"
        />

        <button
          onClick={handleSubmit}
          className='w-full mt-6 bg-amber-500 hover:bg-amber-600 transition py-3 rounded-lg font-semibold text-black'
        >
          Submit Rating
        </button>

        {/* Display user's existing rating for this movie */}
        {existingRating && (
          <div className='mt-6 text-center text-gray-300'>
            <p>Your Previous Rating: ⭐ {existingRating.rating} / 5</p>
            {existingRating.review && <p>Review: {existingRating.review}</p>}
          </div>
        )}
      </div>
    </section>
  )
}

export default UserRatingPage
