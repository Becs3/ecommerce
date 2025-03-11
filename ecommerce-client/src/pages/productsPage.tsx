import { useEffect } from "react"
import { Link } from "react-router";
import { useProducts } from "../hooks/useProduct";
import "../style/productPageStyle.css"
import CategorySearch from "../components/searchCategory";

export const ProductsPage = () => {
    const {products, isLoading, error, fetchProductsHandler } = useProducts();

    useEffect(() => {
        fetchProductsHandler();
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    const searchCategory = (search: string) => {
        products.map((p) => {
            if(search === p.category) {
                return p;              
          } else return;
          })
    }

    return(
    <>
        <div className="products-container">
        <h2>Our Products</h2>
        <CategorySearch searchCategory = {searchCategory}/>
        
            <section className="product-container">{
                products.map((product) => (
                    <article>
                    <div key={product.id} className="article-style">
                        <div className="img-container">
                        <img src={product.image} alt={product.name} />
                        </div>
                        <h3>{product.name} - {product.price}kr </h3>
                        <Link to={`/products/${product.id}`}>{product.name} Details</Link>
                    </div>
                    </article>
                ))
            }</section>
        </div>
    </>
    )
}