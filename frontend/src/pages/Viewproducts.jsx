import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { UserContext } from "../context/UserContext"


function Viewproducts() {
  const API = import.meta.env.VITE_API_URL  
  const [viewproducts, setViewproducts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      fetchproduct()
    }
  }, [user])

  async function fetchproduct() {
    try {
      const response = await axios.get(`${API}/api/Viewproducts`)
      setViewproducts(response.data.viewproducts || [])
    } catch (error) {
      console.error("Failed to load product", error)
      setViewproducts([])
    }
  }

  async function remove(event,id) {
    event.preventDefault()
    try{
      console.log(id) 
    const response= await axios.post(`${API}/api/removeFromProduct`,{
      id:id
    })
    toast.success("Product removed successfully.")
    fetchproduct()
    console.log(response.data)
    }catch(error){
        console.error("Failed ", error)
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="mb-8">
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">products</h1>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                    product name
                </th>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                    image
                </th>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                  price
                </th>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                  category
                </th>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                  remove
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {viewproducts.map((product, index) => (
                <tr key={product._id ?? index} className="transition-colors duration-200 hover:bg-slate-50">
                  <td className="px-7 py-4 text-slate-700">{product.productname}</td>
                  <td className="px-7 py-4 text-slate-700">
                    <img src={`${API}/uploads/${product.productimage}`} width={200} alt="" />
                  </td>
                  <td className="px-7 py-4 text-slate-700">{product.price}</td>
                  <td className="px-10 py-4 text-slate-700">{product.category}</td>
                  <td>
                    <button className="px-7 py-4 text-l text-red-700" onClick={(event)=>{remove(event,product._id)}}>remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewproducts.length === 0 && (
            <div className="px-5 py-6 text-sm text-slate-500">
              No products found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Viewproducts