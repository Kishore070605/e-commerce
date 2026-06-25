import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"

function Home(){
    const API = import.meta.env.VITE_API_URL
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("")
    const { user, logout } = useContext(UserContext)
    
    useEffect(() => {
        fetchProduct()
      }, [])

      async function addToCart(event,id){
            try{
                console.log(id)
                const response = await axios.post(`${API}/api/Cart`,{id:id})
                console.log(response.data)

            }  catch (error) {
          console.error("Failed to load users", error)
          setProduct([])      
      }
    }
    
      async function fetchProduct() {
        try {
          const response = await axios.get(`${API}/api/viewproduct`)
          setProduct(response.data.product || [])
        console.log(response.data.product)
        } catch (error) {
          console.error("Failed to load users", error)
          setProduct([])
        }
      }

      async function searchbar() {
        try {
          const response = await axios.post(`${API}/api/search`,{search})
          setProduct(response.data.viewproducts || [])
        console.log(response.data.viewproducts)
        } catch (error) {
          console.error("Failed to load users", error)
          setProduct([])
        }
      }

      async function handleLogout() {
        await logout()
      }

    return(
        <div className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">E-commerce</h1>
                        
                    </div>
                     <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/profile"
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                        >
                            profile
                        </Link>
                    
                        <Link
                            to="/Orders"
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                        >
                            Orders
                        </Link>
                        <Link
                            to="/Cart"
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                        >
                            Cart
                        </Link>
                        <Link   
                            to="/login" 
                            onClick={handleLogout}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                            Logout
                        </Link>

                        {user?.role=="admin" &&
                           <Link to="/Dashboard" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">Dashboard</Link>
                        }
                    </div>  
                </header>

                {/* <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                    <SearchBar />
                </div> */}
                 <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm flex gap-3">
      <label className="sr-only" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
      />
        <button onClick={searchbar} className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">Search</button>
    </div>

                {product.length>0 &&
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {product.map((data, index) => (
                        <article key={data._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                            <Link to={`/productdetails/${data._id}`}>
                            <img    
                                src={`${API}/uploads/${data.productimage}`}
                                alt="Product"
                                className="h-48 w-full object-cover"
                            />
                            
                                <div className="space-y-3 p-5">
                                    <h4 className="line-clamp-2 text-lg font-semibold text-slate-900">{data.productname}</h4>
                                    <p className="mt-1 text-sm text-slate-500">{data.category}</p>
                                    <p className="mt-2 text-xl font-bold text-slate-900">₹{data.price}</p>
                                </div>
                                </Link>
                                <button className="space-y-3 p-5"
                                    onClick={(event)=>{addToCart(event,data._id)}}                                        
                                    className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95">
                                    Add to cart
                                </button>
                            
                        </article>
                    ))}
                </section>
}
                {product.length<=0 && 
                    <div className="mt-12 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-12 text-center">
                        <p className="text-lg font-medium text-slate-500">No products found</p>
                    </div>
                }

            
                

            </div>
        </div>
    )
}

export default Home
