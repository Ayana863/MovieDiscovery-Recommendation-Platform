import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";
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

  //  Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // logout
  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className='w-full flex items-center justify-between py-8 px-4 fixed top-0 left-0 z-10 bg-gradient-to-br from-[#274c77] via-[#000] to-[#001233]'>

      <h1 className='text-2xl font-bold text-white tracking-wide'>
        <Link to="/">Cine<span className='text-amber-500'>Scope</span></Link>
      </h1>

      {(isLandingPage || isAuthPage) && !user && (
        <Link to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-amber-500 font-semibold border-b-2 border-amber-500"
              : "text-white hover:text-amber-400 transition"
          }>
          <button className='px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition shadow-2xl'>
            Sign In
          </button>
        </Link>
      )}

      {!isLandingPage && !isAuthPage && user && (
        <div className='flex items-center gap-8'>

          <ul className='flex gap-7 text-slate-200 items-center'>
            {!isHome && !isHistory && !isFavorites && (
              <li><Search /></li>
            )}

            <li > <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-500 font-semibold border-b-2 border-amber-500"
                  : "text-white hover:text-amber-400 transition"
              }>
              Home</NavLink>
            </li>

            <li>
              <NavLink to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 font-semibold border-b-2 border-amber-500"
                    : "text-white hover:text-amber-400 transition"
                }>
                <FaRegHeart className="text-red-400 text-lg" title="Add to Favorites" />
              </NavLink>
            </li>

            <li>
              <NavLink to='/history'
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 font-semibold border-b-2 border-amber-500"
                    : "text-white hover:text-amber-400 transition"
                }>WatchHistory</NavLink>
            </li>
          </ul>

          <div className='flex items-center gap-3'>
            <img
              src={Profile}
              className='w-10 h-10 rounded-full border-2 border-amber-500'
            />
            <span className='text-white text-sm'>
              {user.displayName || "User"}
            </span>

            <button
              onClick={handleLogout}
              className='px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold'
            >
              LogOut
            </button>
          </div>

        </div>
      )}
    </nav>
  )
}

export default Navbar
