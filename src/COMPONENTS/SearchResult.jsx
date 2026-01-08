import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { POPULAR_MOVIES_URL, TRENDING_MOVIES_URL, TOP_RATED_MOVIES_URL, IMAGE_URL } from '../API/TmdbData'

function SearchResult({ setMovieCard }) {
    const searchValue = useSelector(state => state.search.value)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchMovies() {
            try {
                const [popular, trending, topRated] = await Promise.all([
                    axios.get(POPULAR_MOVIES_URL),
                    axios.get(TRENDING_MOVIES_URL),
                    axios.get(TOP_RATED_MOVIES_URL)
                ])

                const combined = [...popular.data.results, ...trending.data.results, ...topRated.data.results]

                const uniqueMovies = Array.from(
                    new Map(combined.map(movie => [movie.id, movie])).values()
                )

                setMovies(uniqueMovies)
            } catch (err) {
                console.log(err)
            }
        }

        fetchMovies()
    }, [])

    const filteredMovies = movies.filter(movie =>
        (movie.title || movie.name || '').toLowerCase().includes(searchValue.toLowerCase())
    )

    if (!filteredMovies.length) {
        return (
            <p className='text-center text-gray-400 pt-40'>
                No movies found
            </p>
        )
    }

    return (
        <div className='pt-40 px-6'>
            <h2 className='text-white text-2xl font-bold mb-6'>
                Search Results
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
                {filteredMovies.map(movie => (
                    <div
                        key={movie.id}
                        onClick={() => setMovieCard(movie)}
                        className='bg-gray-900 rounded-lg cursor-pointer hover:scale-105 transition'
                    >
                        <img
                            src={`${IMAGE_URL}${movie.poster_path}`}
                            className='h-72 w-full object-cover rounded-t-lg'
                        />
                        <div className='p-3'>
                            <h3 className='text-white text-sm font-semibold truncate'>
                                {movie.title || movie.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResult
