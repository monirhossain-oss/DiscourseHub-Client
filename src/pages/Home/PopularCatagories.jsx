import React from "react";
import { FaReact, FaNodeJs, FaPaintBrush, FaDatabase, FaMobileAlt, FaBug } from "react-icons/fa";
import { Link } from "react-router";

const categories = [
    { id: 1, name: "React", icon: <FaReact size={30} />, posts: 120, link: "/categories/react" },
    { id: 2, name: "Node.js", icon: <FaNodeJs size={30} />, posts: 95, link: "/categories/nodejs" },
    { id: 3, name: "Design", icon: <FaPaintBrush size={30} />, posts: 80, link: "/categories/design" },
    { id: 4, name: "Database", icon: <FaDatabase size={30} />, posts: 60, link: "/categories/database" },
    { id: 5, name: "Mobile", icon: <FaMobileAlt size={30} />, posts: 75, link: "/categories/mobile" },
    { id: 6, name: "Debugging", icon: <FaBug size={30} />, posts: 50, link: "/categories/debugging" },
];

const PopularCategories = () => {
    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-[#5f0f40] mb-8 text-center">
                    Popular Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            to={category.link}
                            key={category.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 p-6 flex flex-col items-center text-center"
                        >
                            <div className="text-[#9a031e] mb-4">{category.icon}</div>
                            <h3 className="text-xl font-semibold text-[#0f4c5c] mb-2">{category.name}</h3>
                            <p className="text-gray-500 font-medium">{category.posts} Active Posts</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
