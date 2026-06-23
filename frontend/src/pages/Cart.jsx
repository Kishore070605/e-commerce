
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { UserContext } from "../context/UserContext"


function Cart() {

    const [cart, setCart] = useState([])
    const API = import.meta.env.VITE_API_URL
    const { user } = useContext(UserContext)
    
    useEffect(() => {
        if (user) {
            fetchCart()
        }
    }, [user])

    async function fetchCart() {
        try {
            const response = await axios.post(`${API}/api/addCart`, {})
            setCart(response.data.cart.products || [])
            console.log(response.data)
        } catch (error) {
            console.error("Failed to load cart", error)
            setCart([])
        }
    }

    async function remove(event, id) {
        event.preventDefault()
        try {
            const response = await axios.post(`${API}/api/removeFromCart`, {
                id: id
            })
            console.log(id)
            fetchCart()
        } catch (error) {
            console.error("Failed ", error)
        }
    }

    async function updateQuantity(event, id, newQuantity) {
        event.preventDefault()
        if (newQuantity < 1) return
        try {
            const response = await axios.post(`${API}/api/updateQuantity`, {
                id: id,
                quantity: newQuantity
            })
            console.log(response.data)
            fetchCart()
        } catch (error) {
            console.error("Failed to update quantity", error)
        }
    }

    function calcTotal() {
        return cart.reduce((sum, item) => {
            const price = Number(item.price) || 0
            const qty = Number(item.quentity) || 0
            return sum + price * qty
        }, 0)
    }

    async function addOrder(event) {
        const response = await axios.post(`${API}/api/addOrder`, {})
        console.log(response.data)
        toast.success("Your order placed")
        fetchCart()

    }


    return (
        <div>
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Cart</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                         <p className="text-2xl font-semibold text-slate-900">Total : ₹ {calcTotal().toFixed(2)}</p>
                        <button onClick={addOrder}

                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                            buy
                        </button>

                        {/* {sessionStorage.getItem("role")=="admin" &&
                           <Link to="/Dashboard">Dashboard</Link>
                        } */}
                    </div>
                </header>


                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {cart.map((data, index) => (
                        <article key={data._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">



                            <img
                                src={`${API}/uploads/${data.productimage}`}
                                alt="Product"
                                className="h-48 w-full object-cover"
                            />
                            <div className="space-y-3 p-5">
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">Product Name : {data.productname}</h4>
                                    <p className="text-l text-slate-500">Price : {data.price}</p>
                                    
                                    <p className="text-l text-slate-500">Quantity : {data.quentity}</p>
                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                                            <button 
                                                onClick={(event) => updateQuantity(event, data._id, Number(data.quentity) - 1)}
                                                className="rounded px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
                                            >
                                                −
                                            </button>
                                            <span className="min-w-6 text-center font-semibold">{data.quentity}</span>
                                            <button 
                                                onClick={(event) => updateQuantity(event, data._id, Number(data.quentity) + 1)}
                                                className="rounded px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={(event) => { remove(event, data._id) }}
                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                        >
                                            Remove 
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </article>
                    ))}
                </section>


            </div>
        </div>

    )

}

export default Cart