import { Link } from "react-router"
import "../style/adminPage.css"

export const Admin = () => {

    return(
    <>
    <div className="admin-navigation">
        <ul>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/customers">Customers</Link></li>
            <li><Link to="/admin/productItems">Products</Link></li>
            <li><Link to="/">E-shop</Link></li>
        </ul>
    </div>
    <div className="order-container">
        <div className="order-object">
        <p>Here you will see all orders</p>
        </div>

    </div>
    </>
    )
}