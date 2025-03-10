import { FormEvent, useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { useNavigate, useParams } from "react-router";
import { IProduct } from "../../models/product";

export const UpdateProductPage = () => {

    const [product, setProduct] = useState<IProduct|null>(null)
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProducts();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!params.id) return;
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    })

    const handleChange =(e:FormEvent<HTMLInputElement>) => {
        if(!product) return;
        setProduct({...product, price: +e.target.valueOf})

    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(!product) return;

        await updateProductHandler(product.id, {price: product.price})
        navigate("/admin/products")
    }

    if (isLoading) <p>Loading..</p>
    if (error) <p>{error}</p>

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="number"
            value={product?.price} 
            onChange={handleChange}
            />
        </form>
        </>
    )
}