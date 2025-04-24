import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion } from 'framer-motion';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-10 animate-fade-in">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="py-4 px-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow grid grid-cols-[1fr_auto] sm:grid-cols-[3fr_1fr_auto] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 rounded-md object-cover"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div className="space-y-1">
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{productData.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{currency}{productData.price}</span>
                    <span className="px-3 py-1 border rounded-md bg-gray-100 font-medium text-xs">{item.size}</span>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="w-16 sm:w-20 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none text-sm"
              />

              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateQuantity(item._id, item.size)}
                className="w-5 sm:w-6 cursor-pointer hover:opacity-80 transition"
                src={assets.bin_icon}
                alt="Delete"
                title="Remove from cart"
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px] space-y-6">
          <CartTotal />
          <div className="text-right">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/place-order')}
              className="bg-black hover:bg-gray-900 text-white text-sm tracking-wide font-medium px-8 py-3 rounded-lg transition-all"
            >
              PROCEED TO CHECKOUT
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
