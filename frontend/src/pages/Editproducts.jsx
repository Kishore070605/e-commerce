import React, {useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Routes, Route,  useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


function Editproducts() {
    const API = import.meta.env.VITE_API_URL  
    const { register,reset, handleSubmit, formState: { errors } } = useForm()
    const [status, setStatus] = useState("")
    const [image,setImage] = useState("")
    const navigate = useNavigate()
    const {id}=useParams()


     useEffect(() => {
    fetchproduct()
  }, [])

    async function fetchproduct(){
        try{
            const response = await axios.get(`${API}/api/product/${id}`)
            console.log(response.data)
            setImage(response.data.product.productimage)
            reset({
                productname:response.data.product.productname,
                price:response.data.product.price,
                description:response.data.product.description,
                category:response.data.product.category,
                productimage:response.data.product.productimage
            }
            )
        }catch(error){
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
    const formdata = new FormData()
    formdata.append("id",id)
    formdata.append("productname", data.productname)
    formdata.append("price", data.price)
    formdata.append("category", data.category)
    formdata.append("description", data.description)
    if (data.productimage && data.productimage[0])
    {
      formdata.append("productimage", data.productimage[0])
    }

    try {
      const res = await axios.patch(`${API}/api/editproduct`, formdata)
      if(res.data.status){
        toast.success("Product update successfully.")
        // reset()
        navigate(`/Viewproducts`)
      }

    } catch (err) {
      
      setStatus("Upload failed")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 px-8 py-10 text-white sm:px-12 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Product Edit Form</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Edit a Product</h1>
          
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="productName">Product name</label>
                <input {...register("productname", { required: true })} id="productName" type="text" placeholder="e.g. Wireless Headphones" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="price">Price</label>
                <input {...register("price", { required: true })} id="price" type="number" placeholder="Enter price" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="category">Category</label>
              <input {...register("category", { required: true })} id="category" type="text" placeholder="e.g. Electronics" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="productImage">Product image</label>
              <input {...register("productimage")} id="productImage" type="file" accept="image/*" className="w-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 focus:outline-none" />
            
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">Description</label>
              <textarea {...register("description", { required: true })} id="description" rows={5} placeholder="Enter product description" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
              <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200">Update Product</button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Editproducts