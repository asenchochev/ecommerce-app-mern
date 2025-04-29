import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
    return (
        <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Hero left side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50">
                <div className="text-gray-800 max-w-md">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-[2px] bg-gray-800" />
                        <p className="uppercase tracking-wide font-semibold text-sm text-gray-600">Our Bestsellers</p>
                    </div>
                    <h1 className="font-serif text-4xl lg:text-6xl text-gray-900 leading-tight mb-6">Latest Arrivals</h1>
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <p className="font-semibold text-base text-gray-700 group-hover:underline">Shop Now</p>
                        <div className="w-10 h-[1px] bg-gray-800 group-hover:bg-black transition-all duration-300" />
                    </div>
                </div>
            </div>

            {/* Hero right side */}
            <img className="w-full sm:w-1/2 object-cover" src={assets.hero_img} alt="Hero" />
        </div>
    )
}

export default Hero
