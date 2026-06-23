import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function Dashboard(){
    const nevigate = useNavigate()
    const { logout } = useContext(UserContext)

    const handleLogout = async () => {
        await logout()
    }
    return(
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="mx-auto max-w-5xl">
                <header className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                    <h1 className="text-xl font-semibold text-slate-900">E-Commerce Admin</h1>
                    <div className="flex items-center gap-3">
                        <nav className="flex gap-4">
                            <Link to="/Home" className="text-sm text-slate-700 hover:text-slate-900">Home</Link>
                            {/* <Link to="/Userdata" className="text-sm text-slate-700 hover:text-slate-900">Users</Link>
                            <Link to="/product" className="text-sm text-slate-700 hover:text-slate-900">add Products</Link>
                            <Link to="/Viewproducts" className="text-sm text-slate-700 hover:text-slate-900">view Products</Link> */}
                        </nav>
                        <Link to="/login" onClick={handleLogout} className="rounded-md bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800">Logout</Link>
                    </div>
                </header>

                <main>
                    <section className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <Link to="/Userdata" className="text-lg font-medium text-slate-900">Users</Link>
                            <p className="text-sm text-slate-500 mt-2">Check user information .</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <Link to="/Orders" className="text-lg font-medium text-slate-900">Orders</Link>
                            <p className="text-sm text-slate-500 mt-2">Recent orders and statuses.</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <Link to="/product" className="text-lg font-medium text-slate-900">Add products</Link>
                            <p className="text-sm text-slate-500 mt-2">Add products to the home page.</p>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <Link to="/Viewproducts" className="text-lg font-medium text-slate-900">View Products</Link>
                            <p className="text-sm text-slate-500 mt-2">Manage your product catalog.</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard