import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';
import useAnnouncementNotification from "../../hooks/useAnnouncementNotification";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    // console.log(user)

    const { announcements, unseenCount, markAsSeen } = useAnnouncementNotification();

    const { data: userInfo = {}, } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged out successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Logout failed",
                    text: error.message,
                });
            });
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications && unseenCount > 0) {
            markAsSeen();
        }
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-semibold hover:bg-[#cb8f83] px-4 py-1 rounded-sm" onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/membership" className="font-semibold hover:bg-[#cb8f83] px-4 py-1 rounded-sm" onClick={() => setIsOpen(false)}>Membership</NavLink></li>
        </>
    );

    return (
        <nav className="bg-[#DE998E] shadow sticky top-0 z-50">
            <div className="px-2 md:px-4 lg:px-6">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <img src={logo} alt="Logo" className="w-10 rounded-full h-10" />
                        <span className="bg-gradient-to-r hidden md:block from-purple-800 to-pink-800 bg-clip-text text-transparent font-bold">
                            DiscourseHub
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-6 items-center">
                        <ul className="flex gap-4 items-center">
                            {navLinks}
                        </ul>

                        {/* Notification Icon */}
                        <div className="relative">
                            <button className="btn btn-ghost btn-circle relative" onClick={handleNotificationClick}>
                                <FiBell size={22} />
                                {unseenCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {unseenCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg p-3 z-50 max-h-80 overflow-y-auto">
                                    <h3 className="font-semibold mb-2">Announcements</h3>
                                    {announcements.slice(0, 5).map((a) => (
                                        <div key={a._id} className="border-b last:border-none py-1">
                                            <p className="text-sm font-medium">{a.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(a.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                    {announcements.length === 0 && <p className="text-sm text-gray-600">No announcements available.</p>}
                                </div>
                            )}
                        </div>

                        {/* User Avatar */}
                        {user ? (
                            <div className="relative">
                                <img
                                    src={userInfo?.image === undefined || user?.photoURL}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded shadow-lg py-2 z-50">
                                        <p className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-sm font-semibold">{user?.displayName || userInfo?.name}</p>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-base-200"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-base-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-sm">Join Us</Link>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Notification Icon */}
                        <div className="relative">
                            <button className="btn btn-ghost btn-circle relative" onClick={handleNotificationClick}>
                                <FiBell size={22} />
                                {unseenCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {unseenCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg p-3 z-50 max-h-80 overflow-y-auto">
                                    <h3 className="font-semibold mb-2">Announcements</h3>
                                    {announcements.slice(0, 5).map((a) => (
                                        <div key={a._id} className="border-b last:border-none py-1">
                                            <p className="text-sm font-medium">{a.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(a.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                    {announcements.length === 0 && <p className="text-sm text-gray-600">No announcements available.</p>}
                                </div>
                            )}
                        </div>

                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden bg-base-100 shadow-lg p-4 space-y-3">
                    <ul className="space-y-2">
                        {navLinks}
                    </ul>
                    {user || userInfo ? (
                        <div className="flex items-center gap-3 mt-3">
                            <img src={userInfo?.image || user?.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{userInfo.name || "User"}</p>
                                <Link
                                    to="/dashboard"
                                    className="block text-sm text-blue-500 hover:underline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block text-sm text-red-500 hover:underline mt-1"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm w-full mt-3" onClick={() => setIsOpen(false)}>Join Us</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
