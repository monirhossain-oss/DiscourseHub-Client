import React from "react";
import { FaUserPlus, FaPenFancy, FaComments } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus size={40} className="text-[#9a031e]" />,
            title: "Sign Up",
            desc: "Create an account in seconds and join our vibrant community.",
            bg: "bg-[#5f0f40]/10",
        },
        {
            icon: <FaPenFancy size={40} className="text-[#fb8b24]" />,
            title: "Create Post",
            desc: "Start discussions, ask questions, or share your insights.",
            bg: "bg-[#9a031e]/10",
        },
        {
            icon: <FaComments size={40} className="text-[#e36414]" />,
            title: "Engage",
            desc: "Get replies, upvotes, and interact with other community members.",
            bg: "bg-[#0f4c5c]/10",
        },
    ];

    return (
        <section className="py-8 bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5f0f40]">
                    How It Works
                </h2>
                <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                    A simple 3-step process to get started and be part of our community.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg ${step.bg}`}
                    >
                        <div className="mb-4">{step.icon}</div>
                        <h3 className="text-xl font-bold text-[#5f0f40] mb-2">{step.title}</h3>
                        <p className="text-gray-700">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
