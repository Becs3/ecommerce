/* import { useEffect, useState } from "react";
import { useParams } from "react-router"

export const OrderConfirmatin = () => {

    const {session_id} = useParams();
    const [order, setOrder] =useState()

    useEffect(() => {
        
        const fetchOrderConfirm = async () => {
            try{
                const respons = await fetch (
                    `http://localhost:3000/order-confirmation?session_id=${session_id}`
                );

                const data = await respons.json();
                setOrder(data);


        } catch (err) {
            console.log(err)
        }

    }

    fetchOrderConfirm();
}, [session_id] );

    

    return(
        <>
        <div>
        <h2>Order Confirmed!</h2>
      {order ? (
        <div>
          <p>Thank you for your purchase, {order}!</p>
          <p>Payment Status: {order}</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
        </>
    )
} */