import { useEffect, useState } from "react"
import { IProduct } from "../../models/product"
import { useParams } from "react-router";
import { useProducts } from "../../hooks/useProduct";

export const ProductItem = () => {

    const [product, setProduct] = useState<IProduct>()
    const {isLoading, error, fetchProductByIdHandler} = useProducts();
    const param = useParams();

    useEffect (()=> {
        if(!param.id) return;
        fetchProductByIdHandler(+param.id).then((data)=>setProduct(data))
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    // See product details. Be able to update and delete them
    return(
    <>
            <div>
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <p>{product?.category}</p>
            <p>{product?.stock}</p>
            <img src={product?.image} alt={product?.name} />
            </div>
    </>
    )
}