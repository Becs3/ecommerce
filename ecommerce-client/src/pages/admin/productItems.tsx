import { useEffect } from "react"
import { Link } from "react-router";
import { useProducts } from "../../hooks/useProduct";

export const ProductItems = () => {

    const {products, isLoading, error, fetchProductsHandler } = useProducts();
    
        useEffect(() => {
            fetchProductsHandler();
        }, [])
    
        if (isLoading) return <p>Loading...</p>
        if (error) return <p>{error}</p>

    //See all products. Be able to update and delete them
    //Be able to create product
    return(
    <>
    <div>
    <h2> Products </h2>
    <div>
        <button>Add product</button>
    </div>
    <div>
        <section>
            {products.map((p) => (
                <div key={p.id}>
                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{p.stock}</p>
                    <button>Delete</button> 
                    <button>Update</button> 
                </div>
                
            ))}
            <div>
                <Link to="/admin/productItem">See more</Link>
            </div>
        </section>
    </div>
    </div>
    </>
    )
}