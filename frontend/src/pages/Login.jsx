import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try{
      const API = import.meta.env.VITE_API_URL
        const response = await axios.post(`${API}/api/login`, data)
      // const login = await axios.post("http://localhost:3000/api/login",data)
    
      if(response.data.status){  
        sessionStorage.setItem("email",data.email)
        sessionStorage.setItem("role",response.data.role)
        navigate("/home")
      }else{
        console.log("access invalid ")
      }
    }
    catch(error){
      if(error.response.status == 429){
        toast.warning(error.response.data.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">Login</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your email and password to continue.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input type="email" placeholder="Email"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="mt-2 block text-xs text-rose-600">This field is required.</span>}
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input type="password" placeholder="Password"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="mt-2 block text-xs text-rose-600">This field is required.</span>}
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-slate-900 hover:text-slate-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login