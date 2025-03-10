import { NavLink } from "react-router"

export const Nav = () =>{
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}></NavLink>
                </li>
                <li>
                    <NavLink to={"/products"}></NavLink>
                </li>
            </ul>
        </nav>
    )
}