import { createBrowserRouter, } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import JoinUs from "../pages/JoinUs/JoinUs";
import Membership from "../pages/Membership/Membership";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import AddTag from "../pages/Dashboard/Admin/AddTag";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import AddAnnouncement from "../pages/Dashboard/Admin/AddAnnouncement/AddAnnouncement";
import Home from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import TagPostsPage from "../pages/TagPostsPage/TagPostsPage";
import PrivetRoutes from "../routes/PrivetRoutes/PrivetRoutes";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import DeshBoardLayout from "../layouts/DashboardLayout/DashboardLayout";
import ReportedComments from "../pages/Dashboard/Admin/ReportedComments/ReportedComments";

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
                element: <PrivetRoutes><Membership></Membership></PrivetRoutes>
            },
            {
                path: 'posts/:id',
                Component: PostDetails
            },
            {
                path: 'tags/:tagName',
                Component: TagPostsPage
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
        path: 'dashboard',
        element: <PrivetRoutes><DeshBoardLayout></DeshBoardLayout></PrivetRoutes>,
        children: [
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'add-post',
                Component: AddPost
            },
            {
                path: 'add-tags',
                Component: AddTag
            },
            {
                path: "my-posts",
                Component: MyPosts
            },
            {
                path: 'add-announcements',
                Component: AddAnnouncement
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            },
            {
                path: 'reported-comments',
                Component: ReportedComments
            }

        ]
    }
]);