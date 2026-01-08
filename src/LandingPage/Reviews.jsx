import React from 'react'
import { BsFillBalloonHeartFill } from "react-icons/bs";

function Reviews() {
  return (
    <section className='py-24 bg-[#001d3d]'>
      <div className='max-w-6xl mx-auto px-6 text-center'>

        <h2 className='text-4xl text-amber-400 font-bold flex items-center justify-center gap-3'>
          Loved by Movie Fans
          <BsFillBalloonHeartFill className='text-red-500' />
        </h2>

        <p className='text-gray-400 mt-6 max-w-3xl mx-auto'>
          See what our users say about discovering movies with CineScope.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-14'
        >

          {/* Card 1 */}
          <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
            <img
              src=""
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h4 className="mt-4 font-semibold text-lg">Anjali</h4>
            <p className="text-amber-400 mt-1">★★★★★</p>
            <p className="text-gray-300 mt-4">
              CineScope completely changed how I discover movies. Absolutely love it!
            </p>
          </div>

          {/*  Card 2 */}
          <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
            <img
              src=""
              className='w-16 h-16 rounded-full mx-auto'
            />
            <h4 className='mt-4 font-semibold text-lg'>Rahul</h4>
            <p className='text-amber-400 mt-1'>★★★★☆</p>
            <p className='text-gray-300 mt-4'>
              Clean UI, great recommendations, and very easy to use.
            </p>
          </div>

          {/*Card 3 */}
          <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
            <img
              src=""
              className='w-16 h-16 rounded-full mx-auto'
            />
            <h4 className='mt-4 font-semibold text-lg'>Sneha</h4>
            <p className='text-amber-400 mt-1'>★★★★★</p>
            <p className='text-gray-300 mt-4'>
              Perfect platform for movie lovers. Favorites feature is amazing!
            </p>
          </div>

          {/* card 4 */}
          <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
            <img
              src=""
              className='w-16 h-16 rounded-full mx-auto'
            />
            <h4 className='mt-4 font-semibold text-lg'>Sneha</h4>
            <p className='text-amber-400 mt-1'>★★★★★</p>
            <p className='text-gray-300 mt-4'>
              Perfect platform for movie lovers. Favorites feature is amazing!
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Reviews
