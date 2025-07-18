import path from "path";
import React from "react";
const HomePage = React.lazy(() => import("../pages/homePage/home"));
const CreatePage = React.lazy(() => import("../pages/QrPage/create"));
const MyCart = React.lazy(() => import("../pages/MyCartPage/mycart"));
const ChatBot = React.lazy(() => import("../pages/assistantPage/assistant"));
const PaymentMethod = React.lazy(() => import("../pages/MyCartPage/components/paymentMethod"));
const PaymentCash = React.lazy(() => import("../pages/MyCartPage/components/paymentCash"));
export const PUBLIC_ROUTE_PAGE = [
    {
        path: "/",
        element: HomePage
    },
    {
        path: "/create",
        element: CreatePage
    },
    {
        path: "/mycart",
        element: MyCart
    },
    {
        path: "/assistant",
        element: ChatBot
    },
    {
        path: "/payment-transfer",
        element: PaymentMethod
    },
    {
        path: "/payment-cash",
        element: PaymentCash
    }


];