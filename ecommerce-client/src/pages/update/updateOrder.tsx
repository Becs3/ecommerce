import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import { IOrder } from "../../models/order";
import { useOrderItem } from "../../hooks/useOrderItem";

type updateItemProps = {
    OrderId: number;
}

export const UpdateOrder = ({OrderId}:updateItemProps) => {

    const {fetchOrderByIdHandler} =useOrder();
    const {updateOrderItemHandler, deleteOrderItemHandler} =useOrderItem();
    const [order, setOrder] = useState<IOrder>();
    const nav = useNavigate();

    useEffect (() =>{

        if(!OrderId) return;
        fetchOrderByIdHandler(OrderId).then((data) => setOrder(data));

    }, [OrderId])


    const handleChange =(e:ChangeEvent<HTMLInputElement>, orderItemID: number) => {
        const updatedOrderItems = order?.order_items.map((oi) => (
            oi.id === orderItemID
                ? {...oi, quantity: +e.target.value}
                : oi
        ))
 
 
        if(!order || !updatedOrderItems) return;
        setOrder({...order, order_items: updatedOrderItems});
    }
        
            
    const handleSubmit = async (e:FormEvent, orderItemId:number, quantity: number) => {
        e.preventDefault();
        await updateOrderItemHandler(orderItemId, {quantity:  quantity});

        nav(`/admin/orders`)
    }

    const deleteOrderItem = async(id:number) => {

        if(!id) return;
        
        await deleteOrderItemHandler(id);
        nav(`/admin/orders/orderDetails/${id}`);
    }


        return(
            <>
                <section>
                    {order?.order_items.map((oi) => (
                        <div key={oi.product_id} className="list-section">
                            <form onSubmit={(e) =>handleSubmit(e, oi.id, oi.quantity)}>
                            <input type="number"
                            value={oi.quantity}
                            onChange={(e) => handleChange(e, oi.id)}
                            /> 
                            <button type="submit">Update</button>
                            </form>
                            <a onClick={() => {deleteOrderItem(oi.id)}}>Delete item </a>
                    </div>
                
                ))}
                </section>
            </>

)};

