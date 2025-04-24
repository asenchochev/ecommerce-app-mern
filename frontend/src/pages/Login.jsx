import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [mode, setMode] = useState('login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (res.data.success) {
          toast.success('Registration successful!');
          setMode('login');
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto mt-28 px-6 py-8 border border-gray-200 shadow-lg rounded-2xl space-y-5"
    >
      <h2 className="text-center text-3xl font-semibold text-gray-900">
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </h2>
      <p className="text-center text-gray-500 text-sm">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </p>

      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span className="hover:underline cursor-pointer">Forgot password?</span>
        <span
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="hover:underline cursor-pointer"
        >
          {mode === 'login' ? 'Create account' : 'Already have an account?'}
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
      >
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
