import { NavLink } from "react-router"

export const Nav = () =>{
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin"}>Admin</NavLink>
                </li>
            </ul>
        </nav>
    )
}