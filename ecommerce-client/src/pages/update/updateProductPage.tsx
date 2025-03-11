import { FormEvent, useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { Link, useNavigate, useParams } from "react-router";
import { IProduct } from "../../models/product";
import "../adminObject.css"

export const UpdateProductPage = () => {

    const [product, setProduct] = useState<IProduct>()
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProducts();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!params.id) return;
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    }, [])

    const handleChange =(e:FormEvent<HTMLInputElement>) => {
        if(!product) return;
        setProduct({...product, price: +e.currentTarget.value})

    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(!product) return;

        await updateProductHandler(product.id, {...product, price: product.price});
        navigate("/admin/productItems")
    
    }

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>

    return(
        <>
        <div className="object-container">
        <p>Product name: {product?.name}</p>
        <form onSubmit={handleSubmit}>
            <input type="number"
            placeholder="new price"
            value={product?.price ?? ""} 
            onChange={handleChange}
            />
            <button type="submit">Update price</button>
        </form>
        <Link to="/admin/productItems">Back to products</Link>
        </div>
        </>
    )
}