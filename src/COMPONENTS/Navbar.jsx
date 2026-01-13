import React, { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import Search from "./Search";
import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../FIREBASE/Firebase";
import Profile from '../assets/ProfileImg.png'

function Navbar({ isLandingPage }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === "/home"
  const isHistory = location.pathname === "/history"
  const isFavorites = location.pathname === "/favorites"
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register"

  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?")
    if (confirmed) {
      try {
        await signOut(auth)
        navigate("/login")
        setMenuOpen(false)
      } catch (error) {
        console.error("Logout failed:", error)
        alert("Failed to logout. Please try again.")
      }
    }
  }


  return (
    <nav className='w-full fixed top-0 left-0 z-50 bg-gradient-to-br from-[#274c77] via-black to-[#001233] px-6 py-5'>

      {/* TOP BAR */}
      <div className='flex items-center justify-between'>

        {/* LOGO */}
        <Link to="/" className='text-2xl font-bold text-white'>
          Cine<span className='text-amber-500'>Scope</span>
        </Link>

        {/* DESKTOP MENU */}
        {!isLandingPage && !isAuthPage && user && (
          <div className='hidden md:flex items-center gap-8'>

            {!isHome && !isHistory && !isFavorites && <Search />}

            <NavLink to="/home" className={({ isActive }) =>
              isActive ? "text-amber-500 font-semibold border-b-2 border-amber-500" : "text-white"
            }>
              Home
            </NavLink>

            <NavLink to="/favorites"  className={({ isActive }) =>
              isActive ? "text-amber-500 font-semibold border-b-2 border-amber-500" : "text-white"
            }>
              <FaRegHeart className='text-red-400 text-xl' />
            </NavLink>

            <NavLink to="/history"className={({ isActive }) =>
              isActive ? "text-amber-500 font-semibold border-b-2 border-amber-500" : "text-white"
            }>
              WatchHistory
            </NavLink>

            <div className='flex items-center gap-3'>
              <img src={Profile} className='w-9 h-9 rounded-full border-2 border-amber-500' />
              <span className='text-white text-sm'>{user.displayName || "User"}</span>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold'
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* HAMBURGER MENU*/}
        {!isLandingPage && !isAuthPage && user && (
          <button
            className='md:hidden text-white text-2xl'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* sign In  */}
        {(isLandingPage || isAuthPage) && !user && (
          <Link to="/login">
            <button className='px-5 py-2 rounded-lg bg-amber-500 text-black font-semibold'>
              Sign In
            </button>
          </Link>
        )}
      </div>

      {/* MOBILE MENU */}
      {menuOpen && user && (
        <div className='md:hidden mt-6 bg-black/90 rounded-xl p-6 space-y-4'>

          {!isHome && !isHistory && !isFavorites && <Search />}

          <NavLink
            to="/home"
            onClick={() => setMenuOpen(false)}
            className='block text-white'
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className='block text-white'
          >
            Favorites
          </NavLink>

          <NavLink
            to="/history"
            onClick={() => setMenuOpen(false)}
            className='block text-white'
          >
            Watch History
          </NavLink>

          <div className='flex items-center gap-3 pt-4 border-t border-gray-700'>
            <img src={Profile} className='w-9 h-9 rounded-full border-2 border-amber-500' />
            <span className='text-white'>{user.displayName || "User"}</span>
          </div>

          <button
            onClick={handleLogout}
            className='w-full mt-3 px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold'
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
