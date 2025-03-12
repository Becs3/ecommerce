import { useEffect, useState } from "react"
import { IProduct } from "../models/product"
import { useParams } from "react-router";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";
import "../style/productStyle.css"

type AddToCartProps = {
    AddToCart: (product: IProduct, quantity: number) => void;
  }

export const ProductPage = ({AddToCart}: AddToCartProps) => {
        const [product, setProduct] = useState<IProduct | null>(null)
        const [quantity, setQuantity] = useState<number>(1)
        const {isLoading, error, fetchProductByIdHandler} = useProducts();
        const { id } = useParams();
    
        useEffect (()=> {
            if(!id) return;
            fetchProductByIdHandler(+id).then((data)=>setProduct(data))
        }, [])

        const handleClick = () => {

            if(!product) return;
            AddToCart(product, quantity);
        }
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>

    return (
    <>
        <div className="product-container">
            <div className="decription-container">
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>Price per unit: {product?.price}kr</p>
            <label>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
            </label>
            <button onClick={handleClick}>Add to cart</button>
            <p><Link to="/products">Go back to products</Link></p>
            </div>
            <div className="img-container">
                <img src={product?.image} alt={product?.name} />
            </div>
        </div>
    </>
    )
}