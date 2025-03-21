import { useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder"
import { useSearchParams } from "react-router";
import { IOrder } from "../../models/order";
import { useCustomer } from "../../hooks/useCustomer";
import { ICustomer } from "../../models/costumer";

export const OrderConfirmatin = () => {
  const {fetchOrderByPaymentIdHandler, updateOrderHandler} = useOrder();
  const {fetchCustomerByIdHandler} = useCustomer();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id")
  const [order, setOrder] = useState<IOrder|null>(null);
  const [customer, setCustomer] = useState<ICustomer|null>(null);

   useEffect(() => {
    if(!session_id) {
      console.log("found no session_id")
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderData = await fetchOrderByPaymentIdHandler(session_id);
        setOrder(orderData)
      } catch (error){
        error
      }
    }

    fetchOrder();
  }, []) 

  useEffect(()=> {
    const updateOrder = async () => {
      if(!order) return; 
      if(!session_id) return;

      try {
        const orderData = await updateOrderHandler(order.id, {
          order_status: "Paid", 
          payment_id: session_id, 
          payment_status: "Recieved"});

          if(orderData){
            console.log("updated")
          }

      } catch (error){
        error
      }
    }


    updateOrder();
  }, [order])


  useEffect(() => {
    const fetchCustomer = async (id: number) => {
      try {
        const OrderCustomer = await fetchCustomerByIdHandler(id);
        setCustomer(OrderCustomer); 
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    if (order && order.customer_id) {
      fetchCustomer(order.customer_id);
    }
  }, [order]);

  console.log(session_id)
  console.log(order)
  console.log(customer)

  localStorage.setItem("customer_id", JSON.stringify(""));
  localStorage.setItem("cart", JSON.stringify([]));

    return(
        <>
        <div>
          <h2>orderconfirmation</h2>
          <p>Thank you {customer?.firstname }for your order, your order ID: {order?.id}</p>
          <div>
          <p>You have ordered: </p>
            {order?.order_items.map((item) => (
              <div key={item.product_id}>
                <p>{item.product_name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.unit_price}</p>
          </div>
          ))}
          </div>
          <div>
            <p>It will be delivered to: </p>
            <p>{customer?.firstname }{customer?.lastname}</p>
            <p>{customer?.street_address}</p>
            <p>{customer?.postal_code}</p>
            <p>{customer?.city}</p>
          </div>

          <p>Please don't hesitate to contact us for any questions!</p>
        </div>
        </>
    )
} 