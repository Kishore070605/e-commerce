import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function Orders() {

    const API = import.meta.env.VITE_API_URL    
    const [orders, setOrders] = useState([])
    useEffect(() => {
        viewOrders()
    }, [])

    async function viewOrders() {
        try {
            const response = await axios.post(`${API}/api/viewOrders`, { email: sessionStorage.getItem("email") })
            setOrders(response.data.orders || [])
            console.log(response.data.orders)
        } catch (error) {
            console.error("Failed to load orders", error)
            setOrders([])
        }
    }

    return (
        <div>
            <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Your Orders</h1>

                </div>

            </header>

            <section className="">
                {orders.map((data, index) => (
                    <article key={index} className="overflow-hidden">
                        <div className="flex justify-between p-2 text text-xl">
                            <h1>Order {index + 1}</h1>
                            <div className="text text-m">
                                <p className="text-xl text-slate-500">Status : {data.status}</p>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 shadow">
                            {data.products.map((product, index) => (

                                <div className="shadow" key={index}>

                                    <img
                                        src={`${API}/uploads/${product.productimage}`}
                                        alt="Product"
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="space-y-3 p-5">
                                        <div>
                                            <h4 className="text-l font-semibold text-slate-900">Product Name : {product.productname}</h4>
                                            <p className="text-m text-slate-500">Price : {product.price}</p>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </article>
                ))}
            </section>


        </div>
    )
}

export default Orders