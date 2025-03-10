import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";

export const ProductsPage = () => {
    const {products, isLoading, error, fetchProductsHandler } = useProducts();

    useEffect(() => {
        fetchProductsHandler();
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    // List of all products. Go into each product
    return(
    <>
        <div>
            <h2>Products</h2>
            <section>{
                products.map((product) => (
                    <article>
                    <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                    <div>
                        <Link to={`/products/${product.id}`}>Read more</Link>
                    </div>
                    </article>
                ))
            }</section>
        </div>
    </>
    )
}