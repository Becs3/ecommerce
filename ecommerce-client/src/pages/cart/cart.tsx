import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import "./cartCss.css";
import { CreateCustomerPage } from "../create/createCostumer";

export const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cart, UpdateCart, DeleteFromCart } = cartContext;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
    <div className="container">
      <div>
        <h2>Your Cart</h2>
        {cart.map((cartItem) => (
          <div key={cartItem.product.id} className="orderItem-container">
            <img src={cartItem.product.image} alt={cartItem.product.name} />
            <p>{cartItem.product.name}</p>
            <p>price/unit: {cartItem.product.price}</p>
            <section className="quantity-container">
            <button
                  onClick={() => {
                    if (cartItem.quantity < 0) { DeleteFromCart(cartItem.product, cartItem.quantity)} 
                  else {UpdateCart(cartItem.product, cartItem.quantity - 1)}}}> - </button>
            <p>quantity: {cartItem.quantity}</p>
            <button
                  onClick={() =>
                    UpdateCart(cartItem.product, cartItem.quantity + 1)}> + </button>
              </section>
                <button
                  onClick={() =>
                    DeleteFromCart(cartItem.product, cartItem.quantity)
                  }
                >
                  Delete Item
                </button>
          </div>
        ))}
      </div>
      <div className="customer-container">
        <CreateCustomerPage></CreateCustomerPage>
        <button>Log in</button>
        <button>Buy</button>
      </div>
      </div>
    </>
  );
};
