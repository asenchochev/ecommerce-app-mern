import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 trxt-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur quas nulla consectetur, voluptas, suscipit, sapiente rerum magni animi fugiat dolores eligendi omnis amet aut odit ut. Iste repellendus ab perspiciatis.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Brand Fashion</p>
                <ul className='flex flex-col gap-1 text-gray-600'> 
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+359893934322</li>
                    <li>Contact@asenchochev.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center '>Copyright 2025  -All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer