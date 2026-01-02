// Footer.js
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-slate-200 py-8 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide mb-4 md:mb-0">
          Cine<span className="text-amber-500">Scope</span>
        </h1>

        {/* Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="/home" className="hover:text-amber-500 transition">Home</a>
          </li>
          <li>
            <a href="/favorites" className="hover:text-amber-500 transition">Favorites</a>
          </li>
          <li>
            <a href="/history" className="hover:text-amber-500 transition">History</a>
          </li>
          <li>
            <a href="/profile" className="hover:text-amber-500 transition">Profile</a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-amber-500 transition"><FaFacebook /></a>
          <a href="#" className="hover:text-amber-500 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-amber-500 transition"><FaTwitter /></a>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} CineScope. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
