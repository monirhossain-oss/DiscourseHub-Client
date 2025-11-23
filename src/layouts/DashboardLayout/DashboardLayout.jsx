import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import Navbar from '../../components/Navber/Navber';
import {
    AlertCircle,
    FilePlus,
    HomeIcon,
    ListOrdered,
    Megaphone,
    Menu,
    ShieldCheck,
    UserCircle,
    Users2,
} from 'lucide-react';
import Footer from '../../components/Foote/Footer';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const DeshBoardLayout = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                    <div className="w-64 bg-[#fb8b24]/20 p-4 space-y-4 animate-pulse">
                        {[...Array(5)].map((_, idx) => (
                            <div key={idx} className="h-6 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                    <div className="flex-1 p-6">
                        <div className="h-6 w-40 bg-gray-300 rounded mb-4 animate-pulse"></div>
                        <div className="h-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
                        <div className="h-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const loggedInUser = users.find(u => u.email === user?.email);
    const role = loggedInUser?.role;

    const activeClass = "bg-[#5f0f40] text-white font-bold";
    const normalClass = "text-[#0f4c5c]";

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="drawer drawer-mobile lg:drawer-open flex-1 mt-16">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col p-4">
                    {/* Hamburger Button for small screens */}
                    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden w-fit mb-4">
                        <Menu size={24} />
                    </label>

                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side mt-16 lg:mt-4">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-64 min-h-full bg-[#fb8b24]/10 text-base-content space-y-2">
                        {/* USER DASHBOARD */}
                        {role === 'user' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/overview" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <HomeIcon size={18} /> Overview
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <UserCircle size={18} /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-post" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <FilePlus size={18} /> Add Post
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-posts" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <ListOrdered size={18} /> My Posts
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ADMIN DASHBOARD */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-announcements" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <Megaphone size={18} /> Add Announcement
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <ShieldCheck size={18} /> Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <Users2 size={18} /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reported-comments" className={({ isActive }) => isActive ? activeClass : normalClass}>
                                        <AlertCircle size={18} /> Reported Comments
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DeshBoardLayout;
