import React from "react";
import { FaShieldAlt, FaUserShield, FaLock } from "react-icons/fa";

const securityFeatures = [
    {
        id: 1,
        icon: <FaUserShield size={40} className="text-[#5f0f40]" />,
        title: "Moderation",
        description:
            "Our moderators ensure discussions remain respectful and safe.",
    },
    {
        id: 2,
        icon: <FaShieldAlt size={40} className="text-[#9a031e]" />,
        title: "Reporting Tools",
        description: "Easily report inappropriate posts or comments for review.",
    },
    {
        id: 3,
        icon: <FaLock size={40} className="text-[#fb8b24]" />,
        title: "Privacy & Security",
        description:
            "We respect your privacy and protect your data with top-notch security.",
    },
];

const SecurityModeration = () => {
    return (
        <section className="py-8 ">
            <div className="max-w-[1240px] mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5f0f40] mb-12">
                    Security & Moderation
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {securityFeatures.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition duration-300 shadow-lg"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl md:text-2xl font-bold text-[#9a031e] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#0f4c5c] text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecurityModeration;
