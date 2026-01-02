import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const word = "CineScope".split("");

  const directions = [
    { x: 0, y: -80 },
    { x: 80, y: 0 },
    { x: 0, y: 80 },
    { x: -80, y: 0 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home")
    }, 6000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='min-h-screen bg-black flex items-center justify-center text-white font-[Poppins]'>
      <h1 className='text-9xl font-bold tracking-tighter'>
        {word.map((char, index) => {
          const dir = directions[index % 4]

          return (
            <motion.span
              key={index}
              className='inline-block mx-2'
              initial={{ opacity: 0, x: dir.x, y: dir.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: index * 0.4,
              }}
            >
              {char}
            </motion.span>
          )
        })}
      </h1>
    </div>
  )
}

export default LandingPage
