import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


function Productdetails() {

    const [product, setProduct] = useState("")
    const { id } = useParams()
    useEffect(() => {
        fetchproduct()
    }, [])


    async function addToCart(event, id) {
        try {
            console.log(id)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Cart`, { id: id })
            console.log(response.data)
             toast.success("Product added to cart.")

        } catch (error) {
            console.error("Failed to load users", error)
            setProduct([])
        }
    }


    async function fetchproduct() {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
        console.log(response.data)
        setProduct(response.data.product)
    }


    return (
        <div className="flex">

            <div>
                <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${product.productimage}`}
                    alt="Product"
                    className="h-70 w-70 ml-7 object-cover"
                />
            </div>
            <div className="m-10 ml-20">
                <p className="mt-2 text-xl font-bold text-slate-900">Product Name : {product.productname}</p>
                <p className="mt-2 text-xl font-bold text-slate-800">Category : {product.category}</p>
                <p className="mt-2 text-xl font-bold text-slate-800">price : ₹{product.price}</p>
                <p className="mt-2 text-xl font-bold text-slate-800">Descriptiob : {product.description}</p>
                <button className="space-y-3 p-5"
                    onClick={(event) => { addToCart(event, id) }}
                    className="w-full rounded-lg bg-slate-900 px-4 py-3 mt-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95">
                    Add to cart
                </button>
               
            </div>

        </div>
    )
}
export default Productdetails
