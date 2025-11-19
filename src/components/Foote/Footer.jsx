import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#310b22] text-white py-12">
            <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <h3 className="text-xl font-bold mb-4">About</h3>
                    <p className="text-[#e36414] text-sm">
                        DiscourseHub is a community-driven forum where tech enthusiasts
                        share knowledge, collaborate, and grow together.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p className="text-[#fb8b24] text-sm">support@discoursethub.com</p>
                    <p className="text-[#fb8b24] text-sm mt-2">+880 123 456 789</p>
                </div>

                {/* Links & Newsletter */}
                <div className="md:col-span-2 flex flex-col md:flex-row gap-8">
                    {/* Links */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="text-[#9a031e] text-sm space-y-2">
                            <li className="hover:underline cursor-pointer">Terms & Conditions</li>
                            <li className="hover:underline cursor-pointer">Privacy Policy</li>
                            <li className="hover:underline cursor-pointer">FAQ</li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 rounded-md outline-none text-white border border-gray-300 flex-1"
                            />
                            <button className="px-4 py-2 bg-[#9a031e] hover:bg-[#fb8b24] rounded-md text-white font-semibold transition duration-300">
                                Subscribe
                            </button>
                        </form>
                        <div className="flex gap-3 mt-4">
                            <FaFacebookF className="w-6 h-6 cursor-pointer hover:text-[#fb8b24]" />
                            <FaTwitter className="w-6 h-6 cursor-pointer hover:text-[#fb8b24]" />
                            <FaLinkedinIn className="w-6 h-6 cursor-pointer hover:text-[#fb8b24]" />
                            <FaInstagram className="w-6 h-6 cursor-pointer hover:text-[#fb8b24]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-[#e36414]">
                &copy; {new Date().getFullYear()} DiscourseHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
