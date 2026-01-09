import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../FIREBASE/Firebase"

function Auth() {

  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === "/login"
  const [firebaseError, setFirebaseError] = useState("")

  // Yup validation schema
  const schema = yup.object({
    username: yup.string().when([], {
      is: () => !isLogin,
      then: () => yup.string().required("Username required")
    }),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().when([], {
      is: () => !isLogin,
      then: () =>
        yup.string().oneOf([yup.ref("password")], "Passwords must match")
    })
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setFirebaseError("")

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        navigate("/home")
      } else {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )

        // Save username 
        await updateProfile(userCred.user, {
          displayName: data.username,

        })
        // redirect to login after registration
        navigate("/login")
      }
    }
    catch (err) {
      // get Firebase error code
      const errorCode = err.code

      switch (errorCode) {
        case "auth/user-not-found":
          setFirebaseError("User not found")
          break;
        case "auth/wrong-password":
          setFirebaseError("Incorrect password")
          break;
        case "auth/email-already-in-use":
          setFirebaseError("Email already exists")
          break;
        case "auth/invalid-email":
          setFirebaseError("Invalid email format")
          break;
        case "auth/weak-password":
          setFirebaseError("Password should be at least 6 characters")
          break;
        default:
          setFirebaseError("Something went wrong. Try again")
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white'>
      <form onSubmit={handleSubmit(onSubmit)}
        className='bg-gray-900 p-8 rounded w-full max-w-md'>

        <h2 className='text-2xl text-amber-500 mb-4'>
          {isLogin ? "Login" : "Register"}
        </h2>

        {firebaseError && <p className='text-red-500'>{firebaseError}</p>}

        {!isLogin && (
          <input {...register("username")}
            placeholder="Username"
            className='w-full p-2 mb-2 bg-gray-800 rounded' />
        )}

        <input {...register("email")}
          placeholder="Email"
          className='w-full p-2 mb-2 bg-gray-800 rounded' />

        <input type="password" {...register("password")}
          placeholder="Password"
          className='w-full p-2 mb-2 bg-gray-800 rounded' />

        {!isLogin && (
          <input type="password" {...register("confirmPassword")}
            placeholder="Confirm Password"
            className='w-full p-2 mb-2 bg-gray-800 rounded' />
        )}

        <button className='w-full bg-amber-500 py-2 mt-4 rounded'>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className='mt-4 text-center text-gray-400'>
          {isLogin ? "No account? " : "Already have one? "}
          <Link to={isLogin ? "/register" : "/login"} className='text-amber-500'>
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Auth
