import { ChangeEvent, useState } from "react";
import { useOrder } from "../hooks/useOrder";

export const UpdatePaymentStatus = () => {

    return(
        <>
        </>
    )
}

type updateOrderStatusProps = {
    OrderID:number;
  }

export const UpdateOrderStatus = ({OrderID}: updateOrderStatusProps) => {

    const categories = ["paid", "progess"]

      const [orderStatus, setOrderStatus] = useState(""); 
      const {updateOrderHandler}=useOrder();
    
      const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        const orderstatus = e.currentTarget.value;
    
        setOrderStatus(orderstatus)
        /* updateOrderHandler(OrderID, orderStatus)  */       
      }

    return (
        <div>
            <p>OrderStatus</p>
            <select value={orderStatus} onChange={handleChange}>
                {categories.map((orderstatus) => (
                    <option key={orderstatus} value={orderstatus}>
                        {orderstatus}
                    </option>
                ))}
            </select>
        </div>
    );
}
