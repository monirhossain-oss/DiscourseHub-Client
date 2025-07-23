import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FileText, Home, PlusCircle, Tag, User } from 'lucide-react';
import Navbar from '../../components/Navber/Navber';

const DeshBoardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar Always Top */}
            <Navbar />

            <div className="drawer lg:drawer-open flex-1">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col p-4">
                    {/* Hamburger Button for Mobile */}
                    <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden w-fit mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content space-y-1">
                        <li>
                            <NavLink to='/' className="flex items-center gap-2">
                                <Home size={18} /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-profile" className="flex items-center gap-2">
                                <User size={18} /> My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-post" className="flex items-center gap-2">
                                <PlusCircle size={18} /> Add Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-posts" className="flex items-center gap-2">
                                <FileText size={18} /> My Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-tags" className="flex items-center gap-2">
                                <Tag size={18} /> Add Tags
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-announcments" className="flex items-center gap-2">
                                <Tag size={18} /> Add Announcement
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DeshBoardLayout;
