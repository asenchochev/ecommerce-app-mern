import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => console.log(response)
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        userId: token,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const res = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (res.data.success) {
            setCartItems({});
            navigate('/orders');
          } else toast.error(res.data.message);
          break;

        case 'stripe':
          const stripeRes = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } });
          if (stripeRes.data.success) {
            window.location.href = stripeRes.data.session_url;
          } else toast.error(stripeRes.data.message);
          break;

        case 'razorpay':
          const razorpayRes = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
          if (razorpayRes.data.success) {
            initPay(razorpayRes.data.order);
          }
          break;

        default: break;
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 px-6 sm:px-12 bg-gray-50 min-h-screen border-t">
      
      {/* Left Side */}
      <div className="bg-white p-8 shadow-lg rounded-2xl space-y-6">
        <Title text1="Delivery" text2="Information" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="input" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="input" placeholder="Last Name" />
        </div>

        <input required onChange={onChangeHandler} name="email" value={formData.email} className="input" type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="input" placeholder="Street Address" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="input" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="input" placeholder="State" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="input" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="input" placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="input" type="number" placeholder="Phone Number" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-8">
        <CartTotal />

        <div className="bg-white p-8 shadow-lg rounded-2xl mt-6">
          <Title text1="Payment" text2="Method" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

            {[
              { key: 'stripe', img: assets.stripe_logo, label: '' },
              { key: 'razorpay', img: assets.razorpay_logo, label: '' },
              { key: 'cod', img: '', label: 'Cash on Delivery' }
            ].map(({ key, img, label }) => (
              <div key={key} onClick={() => setMethod(key)} className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition ${method === key ? 'border-green-500 bg-green-50' : 'hover:bg-gray-100'}`}>
                <div className={`w-4 h-4 border rounded-full ${method === key ? 'bg-green-500' : ''}`}></div>
                {img ? <img src={img} alt={key} className="h-5" /> : <p className="text-gray-600">{label}</p>}
              </div>
            ))}

          </div>

          <div className="text-end mt-8">
            <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg shadow hover:bg-gray-800 transition">Place Order</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
