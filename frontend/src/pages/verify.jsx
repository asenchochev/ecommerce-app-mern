import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const verify = () => {

    const {navigate ,token,setCartItems,backendUrl} = useContext(ShopContext)

    const[searchParms,setSearchParams] = useSearchParams()

    const success = searchParms.get('success')
    const orderId = searchParms.get('orderId')

    const verifyPayment = async ()=>{
        try{
            if(!token){
                return null

            }
            const response = await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})

            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
                
        }

    }
    useEffect(()=>{
        verifyPayment()
    },[token])


  return (
    <div>

    </div>
  )
}

export default verify