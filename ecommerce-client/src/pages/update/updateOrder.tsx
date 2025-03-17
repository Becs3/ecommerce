import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import { IOrder } from "../../models/order";
import { useOrderItem } from "../../hooks/useOrderItem";
import { IOrderItem } from "../../models/orderItem";

type updateItemProps = {
    OrderId: number;
    OrderItem: IOrderItem;
}

export const UpdateOrder = ({OrderId, OrderItem}:updateItemProps) => {

    const {fetchOrderByIdHandler} =useOrder();
    const {updateOrderItemHandler, deleteOrderItemHandler} =useOrderItem();
    const [order, setOrder] = useState<IOrder>();
    const nav = useNavigate();

    const[orderitemQ, setOrderitemQ] = useState<number>(1)

    useEffect (() =>{

        if(!OrderId) return;
        fetchOrderByIdHandler(OrderId).then((data) => setOrder(data));
        setOrderitemQ(OrderItem.quantity)

    }, [OrderId])


    const handleChange =(e:ChangeEvent<HTMLInputElement>, orderItemID: number) => {
        const updatedOrderItems = order?.order_items.map((oi) => (
            oi.id === orderItemID
                ? {...oi, quantity: +e.target.value}
                : oi
    ))

/*     const updatedQuantity = +e.target.value;
        setOrderitemQ(updatedQuantity) */       
    
 
        if(!order || !updatedOrderItems) return;
        setOrder({...order, order_items: updatedOrderItems});
    }
        
            
    const handleSubmit = async (e:FormEvent, orderItemId:number, orderitemQ: number) => {

        if(!orderitemQ) return;

        e.preventDefault();
        await updateOrderItemHandler(orderItemId, {quantity:  OrderItem.orderitemQ});

        nav(`/admin/orders`)
    }

    const deleteOrderItem = async(id:number) => {

        if(!id) return;
        
        await deleteOrderItemHandler(id);
        nav(`/admin/orders`);
    }


        return(
            <>
                <section>
                        <div>
                            <form onSubmit={(e) =>handleSubmit(e, OrderItem.id, orderitemQ)}>
                            <input type="number"
                            value={orderitemQ}
                            onChange={(e) => handleChange(e, OrderItem.id)}
                            /> 
                            <button type="submit">Update</button>
                            </form>
                            <a onClick={() => {deleteOrderItem(OrderItem.id)}}>Delete item </a>
                        </div>
                </section>
            </>

)};

