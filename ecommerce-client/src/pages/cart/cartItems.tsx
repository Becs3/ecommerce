import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { CartDetailsData } from "../../models/cart";

type ICartData = {
  CartData: (cartInfo: CartDetailsData[]) => void;
};

export const CartItems = ({ CartData }: ICartData) => {
  const cartContext = useContext(CartContext);
  const { cart, UpdateCart, DeleteFromCart } = cartContext;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartInformationData = cart.map((item) => ({
    quantity: item.quantity,
    id: item.product.id,
  }));

  useEffect(() => {
    if (CartData) {
      CartData(cartInformationData);
    }
  }, [CartData, cartInformationData]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        {cart.length < 1 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((cartItem) => (
            <div key={cartItem.product.id} className="orderItem-container">
              <img src={cartItem.product.image} alt={cartItem.product.name} />
              <p>{cartItem.product.name}</p>
              <p>price/unit: {cartItem.product.price}</p>
              <section className="quantity-container">
                <button
                  onClick={() => {
                    if (cartItem.quantity < 2) {
                      DeleteFromCart(cartItem.product, cartItem.quantity);
                    } else {
                      UpdateCart(cartItem.product, cartItem.quantity - 1);
                    }
                  }}
                >
                  {" "}
                  -{" "}
                </button>
                <p>quantity: {cartItem.quantity}</p>
                <button
                  onClick={() =>
                    UpdateCart(cartItem.product, cartItem.quantity + 1)
                  }
                >
                  {" "}
                  +{" "}
                </button>
              </section>
              <button
                onClick={() =>
                  DeleteFromCart(cartItem.product, cartItem.quantity)
                }
              >
                Delete Item
              </button>
            </div>
          ))
        )}
        <h3>Total Price: {totalPrice.toFixed(2)} SEK</h3>
      </div>
    </>
  );
};
