import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FaUserAlt, FaLock } from 'react-icons/fa'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Проверяваме дали има запазен токен в localStorage при зареждане на компонента
  useEffect(() => {
    const savedEmail = localStorage.getItem('email')
    const savedPassword = localStorage.getItem('password')
    if (savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password })
      if (response.data.success) {
        const token = response.data.token
        setToken(token)

        // Ако потребителят е избрал "Remember me", запазваме email и password в localStorage
        if (rememberMe) {
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
        } else {
          // Ако не е избрал "Remember me", изтриваме старите данни
          localStorage.removeItem('email')
          localStorage.removeItem('password')
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Admin Login</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Access your dashboard</p>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
              <FaUserAlt className="mr-2 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
              <FaLock className="mr-2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center justify-start text-sm text-gray-600 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-blue-600"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 rounded-lg py-2 font-semibold tracking-wide"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
