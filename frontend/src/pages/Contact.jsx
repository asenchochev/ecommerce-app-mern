import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-16 px-8 sm:px-12 bg-gradient-to-b from-gray-50 via-white to-gray-100">

      {/* Heading with animations */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      {/* Main Contact Section */}
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-auto max-w-lg mx-auto rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
          src={assets.contact_img}
          alt="Contact"
        />

        {/* Contact Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8 text-gray-700"
        >
          <div>
            <p className="font-semibold text-2xl text-gray-900">Our Store</p>
            <p className="text-lg text-gray-600">ул. „Цариградско шосе” 150<br /> София 1113, България</p>
          </div>

          <div>
            <p><span className="font-semibold">Tel:</span> <span className="text-gray-600">+359 555 0123</span></p>
            <p><span className="font-semibold">Email:</span> <span className="text-gray-600">admin@Fashionbrand.com</span></p>
          </div>


        </motion.div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <NewsletterBox />
      </motion.div>
    </div>
  );
};

export default Contact;
