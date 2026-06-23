import { useEffect, useState } from "react"
import axios from "axios"

function Userdata() {

  const API = import.meta.env.VITE_API_URL  
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const response = await axios.get(`${API}/api/Userdata`)
      setUsers(response.data.user || [])
    } catch (error) {
      console.error("Failed to load users", error)
      setUsers([])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="mb-8">
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">User Registry</h1>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                  Username
                </th>
                <th className="px-5 py-4 font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user, index) => (
                <tr key={user._id ?? index} className="transition-colors duration-200 hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-700">{user.username}</td>
                  <td className="px-5 py-4 text-slate-700">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="px-5 py-6 text-sm text-slate-500">
              No users found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Userdata