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
            </ul>
        </nav>
    )
}