const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

// Popular Movies
export const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

// Top Rated Movies
export const TOP_RATED_MOVIES_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`

// Upcoming Movies
export const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`


// Trending Movies (daily)
export const TRENDING_MOVIES_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`

// Discover Movies (by genre etc.)
export const DISCOVER_MOVIES_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

// similar movies
export const SIMILAR_MOVIES_URL = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`

export const MOVIE_VIDEOS_URL = (movieId) =>
  `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
// Images
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500"
export const BACKDROP_URL = "https://image.tmdb.org/t/p/original"
