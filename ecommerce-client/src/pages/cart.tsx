import { useState } from "react"
import { IProduct } from "../models/product";
import { useParams } from "react-router";
import { ProductPage } from "./productPage";

export const Cart = () => {
    const [cart, setCart] = useState([])
    const param = useParams();

    const AddToCart = (product:IProduct) =>{

        if(!product) return;

    }

    return (
        <>
        <ProductPage AddToCart = {AddToCart} />

        
        </>
    )
}