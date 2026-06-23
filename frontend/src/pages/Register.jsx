import { useForm } from "react-hook-form"
import Login from "./Login"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

// const response = await axios.post(`${API}/api/register`, data);

function Register() {
  const { register, reset, handleSubmit,getValues, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { user, loading } = useContext(UserContext)

  useEffect(() => {
    if (!loading && user) navigate('/home')
  }, [user, loading, navigate])
  const onSubmit = async (data) => {
      try{
        const API = import.meta.env.VITE_API_URL
        const response = await axios.post(`${API}/api/register`, data)
        // const response = await axios.post("https://localhost:3000/api/register", data)
        if(response.data.status){
          reset()
          navigate("/login")
        }
      }catch(error){
        console.log(error)
        
      }
  }

  return (
    <div className="min-h-screen bg-slate-950/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-200/60 bg-white/95 p-8 shadow-[0_32px_120px_rgba(15,23,42,0.15)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold uppercase tracking-[0.24em] text-sky-600">Create an account</h1>
      
        </div>

        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.username && <span className="mt-2 block text-sm text-rose-600">This field is required.</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"   
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.email && <span className="mt-2 block text-sm text-rose-600">This field is required.</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.password && <span className="mt-2 block text-sm text-rose-600">This field is required.</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              type="password"
              placeholder="Re-enter your password"
              {...register("confirmPassword", { required: true,
                validate: (value)=> value === getValues("password") || "password do not match"
               })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.confirmPassword && <span className="mt-2 block text-sm text-rose-600">{errors.confirmPassword.message}</span>}
          </label>

          <button
            className="w-full rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register