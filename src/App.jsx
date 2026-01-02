import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './COMPONENTS/Navbar'
import Home from './PAGES/Home'
import LandingPage from './PAGES/LandingPage'
import Favorites from './PAGES/Favorites'
import WatchHistory from './PAGES/WatchHistory'
import Profile from './PAGES/Profile'
import Genre from './PAGES/Genre'
import Action from './GENRE/Action'
import Comedy from './GENRE/Comedy'
import Drama from './GENRE/Drama'
import Adventure from './GENRE/Adventure'
import Trending from './PAGES/Trending'
import Crime from './GENRE/Crime'
import Horror from './GENRE/Horror'
import Thriller from './GENRE/Thriller'




function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  return (

    <>
      {!isLandingPage &&
        <Navbar />
      }

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />

        <Route path='/genre' element={<Genre />}>

          <Route index element={<Action />} />
          <Route path='action' element={<Action />} />
          <Route path='comedy' element={<Comedy />} />
          <Route path='drama' element={<Drama />} />
          <Route path='adventure' element={<Adventure />} />
          <Route path='crime' element={<Crime />} />
          <Route path='horror' element={<Horror />} />
          <Route path='thriller' element={<Thriller />} />



        </Route>

        <Route path='/favorites' element={<Favorites />} />
        <Route path='/history' element={<WatchHistory />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>





    </>
  )
}

export default App