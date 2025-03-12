import { useState } from "react";
import { IProduct } from "../models/product"

type CheckoutDetailsProps = {
    CheckoutDetails: (product: IProduct, quantity: number) => void;
  }

export const Checkout = ({CheckoutDetails}: CheckoutDetailsProps) => {
    const [cartProduct, setCartProduct] = useState<IProduct[]>([]);
    const [quantity, setQuantity] = useState<number>(1);



    return(
        <>
        <p>display products, price</p>
        <p>display quantity, be able to change and delete</p>
        <p>checkout button = create order</p>
        </>
    )
}