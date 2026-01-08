import React, { useState } from 'react'
import PopularMovies from '../COMPONENTS/PopularMovies'
import TrendingMovies from '../COMPONENTS/TrendingMovies'
import TopRatedMovie from '../COMPONENTS/TopRatedMovie'
import MovieModal from '../COMPONENTS/MovieModal'
import SearchResult from '../COMPONENTS/SearchResult'
import { useSelector } from 'react-redux'

function Trending() {
  const [movieCard, setMovieCard] = useState(null)
  const searchValue = useSelector(state => state.search.value)

  const isSearching = searchValue.trim().length > 0

  return (
    <>
      <div className="min-h-screen bg-black">

        {isSearching ? (
          <SearchResult setMovieCard={setMovieCard} />
        ) : (
          <>
            <div className="pt-40">
              <PopularMovies setMovieCard={setMovieCard} />
            </div>

            <div className="pt-20">
              <TrendingMovies setMovieCard={setMovieCard} />
            </div>

            <div className="pt-20">
              <TopRatedMovie setMovieCard={setMovieCard} />
            </div>
          </>
        )}

      </div>

      <MovieModal movie={movieCard} onClose={() => setMovieCard(null)} />
    </>
  )
}

export default Trending
