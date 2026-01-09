import React from "react";
import heroImg from '../assets/landingImg.jpg'
import About from "../LandingPage/About";
import Reviews from "../LandingPage/Reviews";
import Footer from "../COMPONENTS/Footer";
import { useNavigate } from "react-router-dom";





function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <div className='pt-24 text-white '>

        {/* hero section */}
        <section
          className='relative min-h-[90vh] flex items-center'
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90'></div>

          <div className='relative max-w-7xl mx-auto px-6 text-center'>
            <h1 className='text-6xl md:text-7xl font-extrabold leading-tight'>
              Discover Movies You'll
              <span className='block text-amber-400'>Love</span>
            </h1>

            <p className='text-gray-300 mt-6 text-xl max-w-2xl mx-auto'>
              Discover trending films, personalized recommendations, and hidden gems
              curated just for you.
            </p>

            <button onClick={() => navigate('/register')}
              className='mt-10 px-12 py-4 bg-amber-500 text-black text-lg font-bold
                 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)]
                 hover:scale-105 transition'
            >
              Get Explore
            </button>
          </div>
        </section>



        {/* about */}
        <About />
        {/* reviews */}
        <Reviews />


      </div>
      <Footer />

    </>
  )
}

export default LandingPage
