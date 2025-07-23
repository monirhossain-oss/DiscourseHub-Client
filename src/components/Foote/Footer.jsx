import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import logo from '../../assets/logo.png'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-300 ">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & Tagline */}
                <div className="flex flex-col items-center md:items-start">
                    <img src={logo} alt="DiscourseHub" className="w-16 mb-2 rounded-full" />
                    <h2 className="text-lg font-semibold text-pink-600">DiscourseHub</h2>
                    <p className="text-sm text-gray-600 text-center md:text-left">Empowering discussions, building community, and sharing knowledge seamlessly.</p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-md text-blue-500 font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-gray-600">
                        <li><Link to="/" className="hover:text-pink-600 transition">Home</Link></li>
                        <li><Link to="/membership" className="hover:text-pink-600 transition">Membership</Link></li>
                        <li><Link to="/dashboard/my-profile" className="hover:text-pink-600 transition">Dashboard</Link></li>
                        <li><Link to="/dashboard/add-post" className="hover:text-pink-600 transition">Add Post</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-md text-blue-500 font-semibold mb-2">Follow Us</h3>
                    <div className="flex gap-4 text-gray-600">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
                            <FaGithub size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 py-4">
                <p className="text-center text-sm text-gray-800">
                    © {currentYear} DiscourseHub. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
