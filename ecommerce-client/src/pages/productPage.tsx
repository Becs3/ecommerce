import { useEffect, useState } from "react"
import { IProduct } from "../models/product"
import { useParams } from "react-router";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";

export const ProductPage = () => {
        const [product, setProduct] = useState<IProduct>()
        const {isLoading, error, fetchProductByIdHandler} = useProducts();
        const param = useParams();
    
        useEffect (()=> {
            if(!param.id) return;
            fetchProductByIdHandler(param.id).then((data)=>setProduct(data))
        }, [])
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>


    //Showing product details. be able to add to cart. Choose amount.
    return (
    <>
        <div>
            <div>
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            </div>
            <div>
                <button>Add to cart</button>
            </div>
            <div>
                <img src={product?.image} alt={product?.name} />
            </div>
            <div>
                <Link to="/products">Go back</Link>
            </div>
        </div>
    </>
    )
}