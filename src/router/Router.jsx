import { createBrowserRouter, } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import Membership from "../pages/Membership/Membership";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'joinUs',
                Component: JoinUs
            },
            {
                path: 'membership',
                Component: Membership
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
]);