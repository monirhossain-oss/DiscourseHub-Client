import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FileText, PlusCircle, Tag, User } from 'lucide-react';
import Navbar from '../../components/Navber/Navber';
import Footer from '../../components/Foote/Footer';

const DeshBoardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="hidden lg:block w-64 bg-base-200 p-4 pt-6">
                    <ul className="menu text-base-content space-y-1">
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

                {/* Outlet/Page Content */}
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DeshBoardLayout;
