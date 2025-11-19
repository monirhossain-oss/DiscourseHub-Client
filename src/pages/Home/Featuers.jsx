import React from "react";
import { FaUsers, FaComments, FaThumbsUp, FaPoll, FaSearch, FaBell, FaListAlt } from "react-icons/fa";

const features = [
    {
        icon: <FaComments size={30} className="text-[#5f0f40]" />,
        title: "Real-time Discussions",
        desc: "Replies update instantly without page refresh. Stay engaged in live conversations.",
    },
    {
        icon: <FaListAlt size={30} className="text-[#9a031e]" />,
        title: "Category-Based Threads",
        desc: "Browse posts from different topics easily. Organized discussions for better clarity.",
    },
    {
        icon: <FaThumbsUp size={30} className="text-[#fb8b24]" />,
        title: "Upvote/Downvote System",
        desc: "Highlight the most useful content and discover quality posts quickly.",
    },
    {
        icon: <FaUsers size={30} className="text-[#e36414]" />,
        title: "User Profiles",
        desc: "Customize your profile and track your activity in the community.",
    },
    {
        icon: <FaSearch size={30} className="text-[#5f0f40]" />,
        title: "Advanced Search & Filters",
        desc: "Find posts by keyword, category, time, or popularity easily.",
    },
    {
        icon: <FaBell size={30} className="text-[#9a031e]" />,
        title: "Notifications",
        desc: "Get alerts for replies, mentions, messages, and trending posts.",
    },
];

const Features = () => {
    return (
        <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-[#5f0f40] mb-12">
                    Why Choose Our Forum ?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-[#0f4c5c] mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
