import { FormEvent, useContext, useEffect } from "react";
import "./cartCss.css";
import { CartCustomerDetails } from "./cartCustomerDetails";
import { CartItems } from "./cartItems";
import { CartDetailsData } from "../../models/cart";

export const Cart = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/stripe/create-checkout-session-hosted",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // ????? lista ut själva
        }
      );

      const data = await response.json();
      // console.log(data.checkout_url);

      // Redirect to Stripe Hosted Checkout
      window.location.href = data.checkout_url;
    } catch (error) {
      console.log(error);
    }
  };

  const CartData = (cartInformationData: CartDetailsData[]) => {
    console.log("cart data:", cartInformationData);
  };

  return (
    <>
      <div className="container">
        <CartItems CartData={CartData} />
      </div>
      <div>
        <CartCustomerDetails />
      </div>
      <form onSubmit={handleSubmit}>
        <button>Till betalning</button>
      </form>
    </>
  );
};
