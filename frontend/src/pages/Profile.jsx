
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Profile() {
  const { user, logout, refetchUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    mobile: ''
  })
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const API = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        mobile: user.mobile || ''
      })
      setImagePreview(null)
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadImage = async () => {
    if (!profileImage) {
      toast.error('Please select an image first')
      return
    }

    try {
      setLoading(true)
      const formDataImg = new FormData()
      formDataImg.append('profileimage', profileImage)

      const response = await axios.post(`${API}/api/uploadProfileImage`, formDataImg, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (response.data.status) {
        await refetchUser()
        setProfileImage(null)
        setImagePreview(null)
        toast.success('Profile image updated successfully!')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API}/api/updateProfile`, formData)
      
      if (response.data.status) {
        await refetchUser()
        setIsEditing(false)
        toast.success('Profile updated successfully!')
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      mobile: user?.mobile || ''
    })
    setProfileImage(null)
    setImagePreview(null)
    setIsEditing(false)
  }

  const getProfileImageUrl = () => {
    if (imagePreview) return imagePreview
    if (user?.profileimage) return `${API}/uploads/${user.profileimage}`
    return null
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>

          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/home"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {getProfileImageUrl() ? (
                <img
                  src={getProfileImageUrl()}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-4xl font-semibold text-white">
                  {user?.username?.[0]?.toUpperCase() ?? 'U'}
                </div>
              )}
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{user?.username ?? 'Unknown User'}</h2>
              <p className="mt-2 break-words text-sm text-slate-500">{user?.email ?? 'No email available'}</p>
              <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {user?.role ?? 'user'}
              </span>
            </div>
          </aside>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Account details</h2>
                
              </div>
              <div className="flex flex-wrap gap-3">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                  >
                    Edit Profile
                  </button>
                )}
                <Link
                  to="/Cart"
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  View Cart
                </Link>
                <Link
                  to="/Orders"
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  Orders
                </Link>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Profile Image
                  </label>
                  <div className="mt-4 flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 rounded-full object-cover"
                      />
                    ) : user?.profileimage ? (
                      <img
                        src={`${API}/uploads/${user.profileimage}`}
                        alt="Current"
                        className="h-32 w-32 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 text-5xl font-semibold text-slate-500">
                        {user?.username?.[0]?.toUpperCase() ?? 'U'}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
                    />
                    {profileImage && (
                      <button
                        onClick={handleUploadImage}
                        disabled={loading}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {loading ? 'Uploading...' : 'Upload Image'}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email ?? ''}
                    disabled
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
                  />
                  <p className="mt-1 text-xs text-slate-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <dt className="text-sm font-medium text-slate-500">Full name</dt>
                  <dd className="mt-2 text-base font-semibold text-slate-900">{user?.username ?? 'Not set'}</dd>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <dt className="text-sm font-medium text-slate-500">Email address</dt>
                  <dd className="mt-2 text-base font-semibold text-slate-900">{user?.email ?? 'Not set'}</dd>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <dt className="text-sm font-medium text-slate-500">Mobile number</dt>
                  <dd className="mt-2 text-base font-semibold text-slate-900">{user?.mobile ?? 'Not set'}</dd>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <dt className="text-sm font-medium text-slate-500">Account type</dt>
                  <dd className="mt-2 text-base font-semibold text-slate-900">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</dd>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile