import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { ProductsPage } from "./pages/productsPage";
import { ProductPage } from "./pages/productPage";
import { CustomersPage } from "./pages/admin/costumerPage";
import { Admin } from "./pages/admin";
import { Orders } from "./pages/admin/orders";
import { OrderDetails } from "./pages/admin/order";
import { ProductItems } from "./pages/admin/productItems";
import { ProductItem } from "./pages/admin/productItem";

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
                path:"/products/:id",
                element: <ProductPage />
            },
            {
                path:"/admin",
                element: <Admin />,
            },
                    {
                        path:"/admin/customers",
                        element: <CustomersPage />
                    },
                    {
                        path:"/admin/orders",
                        element: <Orders />
                    },
                    {
                        path:"/admin/orderDetails/:id",
                        element: <OrderDetails />
                    },{
                        path:"/admin/productItems",
                        element: <ProductItems />
                    },
                    {
                        path:"/admin/productItem/:id",
                        element: <ProductItem />
                    }
            
        ]
    }
])