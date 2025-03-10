import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { ProductsPage } from "./pages/productsPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/products",
                element: <ProductsPage />
            },
            {
                path:"/",
                element: <Home />
            },
        ]
    }
])