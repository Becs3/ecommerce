import { Link } from "react-router"

export const Admin = () => {



    //see orders, costumers, orderdetails, productdetails options
    return(
    <>
    <div>
        <span><Link to="/admin/orders">Orders</Link></span>
        <span><Link to="/admin/customers">Customers</Link></span>
        <span><Link to="/admin/productItems">Products</Link></span>
        <span><Link to="/">E-shop</Link></span>
    </div>
    </>
    )
}