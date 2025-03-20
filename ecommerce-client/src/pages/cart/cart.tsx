import { FormEvent, useContext, useEffect, useState } from "react";
import "./cartCss.css";
import { CartCustomerDetails } from "./cartCustomerDetails";
import { CartItems } from "./cartItems";
import { Customer } from "../../models/costumer";
import { CartContext } from "../../context/cartContext";
import { useOrder } from "../../hooks/useOrder";
import { IOrder } from "../../models/order";
import { IOrderItem } from "../../models/orderItem";

export const Cart = () => {
    const cartContext = useContext(CartContext);
    const {cart} = cartContext;
    const {createOrderHandler} = useOrder();
    const [custId, setCustId] = useState<number>(0)

    useEffect(() => {
      const storedID = localStorage.getItem("customer_id"); 
      if(storedID){
        const customerID =Number( JSON.parse(storedID));
        setCustId(customerID)
      }
    }, [custId]);

  const cartItems = cart.map((item) => ({
    product_id: item.product.id,
    product_name: item.product.name,
    quantity: item.quantity,
    unit_price: item.product.price,
  }));


  const CustomerData = (customer: Customer | null) => {
    if (customer) {
      localStorage.setItem("customer_id", JSON.stringify(customer.id));
      console.log("Customer id saved:", customer.id);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(custId)

    if (!custId) {
      console.error("Customer ID is missing.");
      return;
    } 

    const newOrder: IOrder = {
      id:0,
      customer_id: custId,
      payment_status:"unpaid",
      payment_id:"",
      order_status:"pending",
      order_items: cartItems.map((item) => ({
        ...item,
        id: 0,
        order_id: 0,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        created_at: new Date().toISOString()
    })) as IOrderItem[]
  } as IOrder;

    try {

      console.log(newOrder)
      console.log(cartItems)

      const createdOrder = await createOrderHandler(newOrder);
      const orderId = createdOrder;
      console.log(orderId)

      const response = await fetch(
        "http://localhost:3000/stripe/create-checkout-session-hosted",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({newOrder})
        }
      );

      const data = await response.json();
      // console.log(data.checkout_url);

      // Redirect to Stripe Hosted Checkout
      window.location.href = data.checkout_url;


    } catch (error) {
      console.log(error);
    } finally {
      /* localStorage.setItem("customer_id", JSON.stringify("")); */
      localStorage.setItem("cart", JSON.stringify([])); 
    }
  };

  return (
    <>
        {cart.length < 1 ? (
          <p>Empty cart</p>) : (
      <>
      <div className="container">
      <div>
        <CartItems />
      </div>
      <div>
        <CartCustomerDetails CustomerData={CustomerData}/>
      </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">To checkout</button>
      </form>
      </>
    )}
    </>
  );
};
