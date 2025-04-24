import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-10 px-4 sm:px-10 border-t">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      {/* Main block */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:max-w-[450px] rounded-xl shadow-md"
          src={assets.about_img}
          alt="About us"
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-base leading-relaxed"
        >
          <p>
            <span className="font-semibold text-gray-800">BrandFashion</span> – Your one-stop destination for trendy fashion,
            seamless shopping, and unbeatable deals. Shop with confidence and style, anytime, anywhere! ✨🛍️
          </p>
          <p>
            Our online platform makes shopping easy with secure payments, fast delivery, and exclusive deals – designed to
            upgrade your lifestyle from the comfort of your home.
          </p>
          <b className="text-xl text-gray-800">Our Mission</b>
          <p>
            At <span className="text-indigo-600 font-semibold">BrandFashion</span>, our mission is to offer a seamless shopping experience,
            blending quality fashion with affordability. We bring you the latest trends, fast delivery, and secure transactions—
            so you can express your unique style with confidence.
          </p>
        </motion.div>
      </div>

      {/* Second Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl mb-10"
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      {/* Причини */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: 'Quality Assurance',
            text: 'We ensure every product meets our high standards, so you always receive the best quality.',
          },
          {
            title: 'Convenience',
            text: 'Shop from anywhere, anytime with our intuitive web and mobile platform.',
          },
          {
            title: 'Exceptional Customer Service',
            text: 'Our team is here for you, ready to help with any issue, question, or request.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="border rounded-2xl px-10 py-8 shadow-sm hover:shadow-lg transition-all bg-white"
          >
            <b className="text-lg text-gray-800">{item.title}</b>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <NewsletterBox />
      </motion.div>
    </div>
  );
};

export default About;
