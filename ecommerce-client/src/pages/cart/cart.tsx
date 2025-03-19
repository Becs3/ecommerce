import { FormEvent } from "react";
import "./cartCss.css";
import { CartCustomerDetails } from "./cartCustomerDetails";
import { CartItems } from "./cartItems";
import { CartDetailsData } from "../../models/cart";
import { Customer } from "../../models/costumer";

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

  const CustomerData = (customer: Customer | null) => {
    console.log("Customer data:", customer);
  };

  return (
    <>
      <div className="container">
        <CartItems CartData={CartData} />
      </div>
      <div>
        <CartCustomerDetails CustomerData={CustomerData}/>
      </div>
      <form onSubmit={handleSubmit}>
        <button>To checkout</button>
      </form>
    </>
  );
};
