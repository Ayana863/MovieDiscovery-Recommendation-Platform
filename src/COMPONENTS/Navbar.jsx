import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";



function Navbar({ isLandingPage }) {
  // useLocation  is a router-dom hook , access the current URL path
  const location = useLocation()
  const isHome = location.pathname === '/home'
  const isHistory = location.pathname === '/history'
  const isFavorites = location.pathname === '/favorites'
  return (
    <>



      <nav className='w-full flex items-center justify-between py-8 px-4 fixed top-0 left-0 z-10 bg-gradient-to-br from-[#274c77] via-[#000] to-[#001233]'>

        <h1 className='text-2xl font-bold text-white tracking-wide'>
          <Link to={'/'}>Cine<span className="text-amber-500">Scope</span></Link>
        </h1>

        {isLandingPage ?
          (
            <button className='px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition shadow-2xl'>
              Sign In
            </button>
          ) : (
            <>
              <ul className='md:flex gap-7 text-slate-200 items-center'>

                {/* conditional rendering , if path is home , show search icon */}


                {
                  !isHome && !isHistory && !isFavorites && (
                    <li className='flex items-center border-b-2
                             border-transparent hover:border-gray-500 transition'>
                      <Search />
                    </li>
                  )


                }

                <li className='hover:text-amber-500 transition'>
                  {/* NavLink=used for navigation with active styling */}
                  <NavLink to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-yellow-400 font-semibold"
                        : "border-b-2 border-transparent hover:border-gray-500"
                    }>
                    Home
                  </NavLink>
                </li>

                <li className='hover:text-amber-500 transition" title="Favorites'>
                  <NavLink to="/favorites" title='Favorites'
                    className={({ isActive }) =>
                      `inline-block px-1 pb-1 ${isActive
                        ? "border-b-2 border-yellow-400"
                        : "border-b-2 border-transparent"
                      }`
                    }>
                    <FaRegHeart className='text-red-400 text-lg' />

                  </NavLink>
                </li>

                <li className='hover:text-amber-500 transition '>

                  <NavLink to="/history"
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-yellow-400 font-semibold"
                        : "border-b-2 border-transparent hover:border-gray-500"
                    }>
                    WatchHistory
                  </NavLink>
                </li>

                <li className='hover:text-amber-500 transition'>
                  <NavLink to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 border-yellow-400 font-semibold"
                        : "border-b-2 border-transparent hover:border-gray-500"
                    }>
                    Profile
                  </NavLink>
                </li>
              </ul>

              <button className='px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold transition shadow-2xl'>
                LogOut
              </button>
            </>


          )

        }
      </nav>



    </>
  )
}

export default Navbar
