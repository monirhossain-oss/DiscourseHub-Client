import { createBrowserRouter, } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import JoinUs from "../pages/JoinUs/JoinUs";
import Membership from "../pages/Membership/Membership";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Homes from "../pages/Home/Banner";
import DeshBoardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../pages/Dashboard/AddPost/AddPost";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true,
                Component: Homes
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
    {
        path:'dashboard',
        Component: DeshBoardLayout,
        children: [
            {
                path:'my-profile',
                Component: MyProfile
            },
            {
                path:'add-post',
                Component: AddPost
            }

        ]
    }
]);