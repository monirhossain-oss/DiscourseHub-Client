import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FileText, Home, PlusCircle, Tag, User } from 'lucide-react';
import Navbar from '../../components/Navber/Navber';

const DeshBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Deshboard</div>

                </div>
                {/* Page content here */}
                <Navbar></Navbar>
                <Outlet></Outlet>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to='/' className="flex items-center gap-2">
                            <Home size={18} /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/my-profile"
                            className="flex items-center gap-2"
                        >
                            <User size={18} /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add-post"
                            className="flex items-center gap-2"
                        >
                            <PlusCircle size={18} /> Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/my-posts"
                            className="flex items-center gap-2"
                        >
                            <FileText size={18} /> My Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add-tags"
                            className="flex items-center gap-2"
                        >
                            <Tag size={18} /> Add Tags
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/add-announcments"
                            className="flex items-center gap-2"
                        >
                            <Tag size={18} /> Add Announcment
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DeshBoardLayout;