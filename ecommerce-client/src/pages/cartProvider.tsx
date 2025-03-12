import { useState } from "react"
import { IProduct } from "../models/product";
import { ProductPage } from "./productPage";
import { Checkout } from "./checkout";

export const Cart = () => {
    const [cart, setCart] = useState<{product: IProduct; quantity:number }[]>([])

    const AddToCart = (product:IProduct, quantity:number) =>{

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id);
    
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity }];
            }
        });

    }

    const CheckoutDetails = () => {
        
        CheckoutDetails()

    }

    return (
        <>
        <ProductPage AddToCart = {AddToCart} />
        <Checkout CheckoutDetails = {CheckoutDetails} />
        </>
    )
}