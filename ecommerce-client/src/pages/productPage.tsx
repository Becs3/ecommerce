import { useEffect, useState } from "react"
import { IProduct } from "../models/product"
import { useParams } from "react-router";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";
import "../style/productStyle.css"

export const ProductPage = () => {
        const [product, setProduct] = useState<IProduct>()
        const {isLoading, error, fetchProductByIdHandler} = useProducts();
        const param = useParams();
    
        useEffect (()=> {
            if(!param.id) return;
            fetchProductByIdHandler(+param.id).then((data)=>setProduct(data))
        }, [])
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>


    //Showing product details. be able to add to cart. Choose amount.
    return (
    <>
        <div className="product-container">
            <div className="decription-container">
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>Price per unit: {product?.price}kr</p>
            <button>Add to cart</button>
            <p><Link to="/products">Go back to products</Link></p>
            </div>
            <div className="img-container">
                <img src={product?.image} alt={product?.name} />
            </div>
        </div>
    </>
    )
}