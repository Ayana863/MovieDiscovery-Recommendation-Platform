import React, { useState } from 'react'
import UpcomingMovies from '../COMPONENTS/UpcomingMovie'
import PopularMovies from '../COMPONENTS/PopularMovies'
import TopRatedMovie from '../COMPONENTS/TopRatedMovie'
import MovieModal from '../COMPONENTS/MovieModal'



function Trending() {
  const [movieCard, setMovieCard] = useState(null)
  return (
    <>

      <div className='min-h-screen bg-black'>

        <div className='pt-40 px-6'>
          <UpcomingMovies />
        </div>

        <div className='pt-40'>
          <PopularMovies setMovieCard={setMovieCard} />
        </div>

        <div className='pt-20'>
          <TopRatedMovie setMovieCard={setMovieCard} />
        </div>

      </div>

      <MovieModal movie={movieCard} onClose={() => setMovieCard(null)} />
    </>
  )
}

export default Trending
