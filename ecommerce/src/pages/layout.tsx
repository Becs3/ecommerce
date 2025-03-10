import { Outlet } from "react-router"
import { Nav } from "../components/nav"

export const Layout = () => {
    return(
        <>
        <header><Nav /></header>
        <main><Outlet /></main>
        <footer></footer>
        </>
    )
}