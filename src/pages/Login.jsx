import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userType, setUserType] = useState('user')

  const { login } = useAuth()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        navigate('/account')
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl border bg-base-100 p-10 shadow-lg" style={{
        borderColor: '#C4C2CF',
        boxShadow: '0 15px 35px rgba(255, 255, 255, 0.3), 0 8px 20px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)',
        minHeight: '500px'
      }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{color: '#ffffff'}}>Login</h1>
          <div className="w-16 h-1 bg-white mx-auto rounded-full opacity-60"></div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium" style={{color: '#FFD700'}}>Login As</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="text-white">Customer</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="shopkeeper"
                  checked={userType === 'shopkeeper'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="text-white">Shopkeeper</span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error bg-red-500/20 border-red-500 text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium" style={{color: '#FFD700'}}>Email</span>
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="you@example.com" 
              required 
              style={{
                borderColor: '#E5E7EB',
                backgroundColor: '#F9FAFB',
                padding: '12px 16px',
                borderRadius: '8px',
                color: '#1F2937'
              }}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium" style={{color: '#FFD700'}}>Password</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12" 
                placeholder="••••••••" 
                required 
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: '#F9FAFB',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: '#1F2937'
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                style={{ color: '#FFD700' }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953.138 2.863.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full mt-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px'
            }}
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <div className="loading loading-spinner loading-sm"></div>
                <span>Logging in...</span>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="link link-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login


