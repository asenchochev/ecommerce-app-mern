import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setaVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const navLinkStyle = ({ isActive }) =>
        `pb-1 border-b-2 ${isActive ? 'border-black text-black' : 'border-transparent text-gray-600 hover:border-gray-400 transition duration-200'}`

    return (
        <div className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium bg-white shadow-md sticky top-0 z-50">

            <Link to="/"><img src={assets.logo} className="w-32 sm:w-36" alt="Logo" /></Link>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-6 text-sm">
                <NavLink to="/" className={navLinkStyle}><p>HOME</p></NavLink>
                <NavLink to="/collection" className={navLinkStyle}><p>COLLECTION</p></NavLink>
                <NavLink to="/about" className={navLinkStyle}><p>ABOUT</p></NavLink>
                <NavLink to="/contact" className={navLinkStyle}><p>CONTACT</p></NavLink>
            </ul>

            {/* Icons Section */}
            <div className="flex items-center gap-5">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer hover:scale-110 transition" alt="Search" />
                <div className="relative group">
                    <img
                        onClick={() => !token && navigate('/login')}
                        className="w-5 cursor-pointer hover:scale-110 transition"
                        src={assets.profile_icon}
                        alt="Profile"
                    />
                    {token &&
                        <div className="hidden group-hover:block absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-3 px-5 text-gray-600 w-40 z-50">
                            <p className="cursor-pointer hover:text-black transition" onClick={() => navigate('/profile')}>My Profile</p>
                            <p className="cursor-pointer hover:text-black transition" onClick={() => navigate('/orders')}>Orders</p>
                            <p className="cursor-pointer hover:text-black transition" onClick={logout}>Logout</p>
                        </div>}
                </div>

                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className="w-5" alt="Cart" />
                    <span className="absolute -right-2 -bottom-2 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {getCartCount()}
                    </span>
                </Link>

                {/* Mobile Menu Icon */}
                <img onClick={() => setaVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="Menu" />
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed top-0 right-0 h-full bg-white z-50 shadow-md transform transition-all duration-300 ${visible ? 'w-4/5' : 'w-0 overflow-hidden'}`}>
                <div className="flex flex-col text-gray-600 p-5">
                    <div onClick={() => setaVisible(false)} className="flex items-center gap-3 mb-5 cursor-pointer">
                        <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
                        <p>Back</p>
                    </div>
                    <NavLink to="/" onClick={() => setaVisible(false)} className="py-3 border-b">HOME</NavLink>
                    <NavLink to="/collection" onClick={() => setaVisible(false)} className="py-3 border-b">COLLECTION</NavLink>
                    <NavLink to="/about" onClick={() => setaVisible(false)} className="py-3 border-b">ABOUT</NavLink>
                    <NavLink to="/contact" onClick={() => setaVisible(false)} className="py-3 border-b">CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
