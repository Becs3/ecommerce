import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { IOrder } from "../../models/order";
import { useOrder } from "../../hooks/useOrder";
import { useOrderItem } from "../../hooks/useOrderItem";
import { OrderItem } from "../../models/orderItem";
import { UpdateOrder } from "../update/updateOrder";

export const OrderDetails = () => {

    const {fetchOrderByIdHandler, isLoading, error} = useOrder();
    const {deleteOrderItemHandler} = useOrderItem();
    const [order, setOrder] = useState<IOrder>();
    const nav = useNavigate();
    const params = useParams();
    

    useEffect(() => {
        if(!params.id) return;
        fetchOrderByIdHandler(+params.id).then((data)=>setOrder(data));
        
    }, [])

    const deleteOrderItem = async(id:number) => {

        if(!id) return;
        
        await deleteOrderItemHandler(id);
        nav(`/admin/orders/orderDetail/${id}`);
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
    <>
            <div className="object-container">
                <section>
                <h2>OrderDetails</h2>
                <ul>
                    <li>Payment status: {order?.payment_status}</li>
                    <li>Order status: {order?.order_status}</li>
                    <li>Order price: {order?.total_price}</li>
                    <li>Order date: {order?.created_at}</li>
                </ul>
                </section>
                <section>
                    <h2>customer info</h2>
                    <ul>
                        <li>Customer name: {order?.customer_firstname} {order?.customer_lastname}</li>
                        <li>email: {order?.customer_email}</li>
                        <li>phone: {order?.customer_phone}</li>
                        <li>street: {order?.customer_street_address}</li>
                        <li>postal code: {order?.customer_postal_code}</li>
                        <li>city: {order?.customer_city}</li>
                        <li>country: {order?.customer_country}</li>
                    </ul>
                </section>
                <section>
                    <h2>order items</h2>
                    {order?.order_items.map((oi) => (
                <div key={oi.product_id} className="list-section">
                    <p>Item ID: {oi.product_id}</p>
                    <p>Name: {oi.product_name}</p>
                    <p>Quantity: {oi.quantity}</p>
                    <UpdateOrder OrderId={order.id}></UpdateOrder>
                    <p>Price: {oi.unit_price}</p>
                    <ul>
                    <li><a onClick={() => {deleteOrderItem(oi.product_id)}}>Delete item </a></li>
                    </ul>
                </div>
                
            ))}
                </section>
            <Link to="/admin/orders">Back to products</Link>
            </div>
            
    </>
    )
}

