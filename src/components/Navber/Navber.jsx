import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

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

    const navLinks = (
        <>
            <li><NavLink to="/" className="font-semibold" onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/membership" className="font-semibold" onClick={() => setIsOpen(false)}>Membership</NavLink></li>
        </>
    );

    return (
        <nav className="bg-green-300 shadow sticky top-0 z-50">
            <div className="max-w-7xl px-2 md:px-4 lg:px-6 mx-auto ">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo and site name */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                        <img src={logo} alt="Logo" className="w-10 rounded-full h-10" />
                        <span className="bg-gradient-to-r hidden md:block from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                            DiscourseHub
                        </span>

                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-6 items-center">
                        <ul className="flex gap-4 items-center">
                            {navLinks}
                        </ul>
                        <button className="btn btn-ghost btn-circle">
                            <FiBell size={22} />
                        </button>
                        {user ? (
                            <div className="relative">
                                <img
                                    src={user.photoURL || "/placeholder-user.png"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded shadow-lg py-2 z-50">
                                        <p className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-sm font-semibold">{user.displayName || "User"}</p>
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button className="btn btn-ghost btn-circle">
                            <FiBell size={22} />
                        </button>
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
                    {user ? (
                        <div className="flex items-center gap-3 mt-3">
                            <img src={user.photoURL || "/placeholder-user.png"} alt="Profile" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{user.displayName || "User"}</p>
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
