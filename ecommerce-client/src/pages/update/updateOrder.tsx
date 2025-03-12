import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import { IOrder } from "../../models/order";

type updateItemProps = {
    OrderId: number;
}

export const UpdateOrder = ({OrderId}:updateItemProps) => {

    const {fetchOrderByIdHandler, updateOrderHandler} =useOrder();
    const [order, setOrder] = useState<IOrder>();
    const nav = useNavigate();

    useEffect (() =>{

        if(!OrderId) return;
        fetchOrderByIdHandler(OrderId).then((data) => setOrder(data));

    }, [OrderId])


    const handleChange =(e:ChangeEvent<HTMLInputElement>) => {
                
        if(!order) return;
            setOrder({...order, order_items: [/* order.order_items[] */]})
        }
        
            
    const handleSubmit = async (e:FormEvent, ItemID:number) => {
            e.preventDefault();
        
            if(!ItemID === order?.order_items[{id}]) return;

            await updateOrderHandler(order.id, {...order.order_items[{ItemID}]});
            nav("/admin/orders")
            
        }




    return(
        <>
                <section>
                    <h2>order item update</h2>
                    {order?.order_items.map((oi) => (
                <div key={oi.product_id} className="list-section">
                    <p>Item ID: {oi.product_id}</p>
                    <p>Name: {oi.product_name}</p>
                    <p>Quantity: {oi.quantity}</p>
                    <form onSubmit={() =>handleSubmit(e, oi.product_id)}>
                    <input type="number"
                    value={oi.quantity}
                    onChange={handleChange}
                    /> 
                    <button type="submit">Update</button>
                    </form>
               </div>
                
                ))}
                </section>
        </>

)};