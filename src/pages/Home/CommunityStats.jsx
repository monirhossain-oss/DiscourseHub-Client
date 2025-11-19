import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaRegComments, FaUserFriends, FaSignal } from "react-icons/fa";

const CommunityStats = () => {
    const stats = [
        { id: 1, icon: <FaUsers size={40} className="text-[#5f0f40]" />, label: "Registered Users", value: 12000 },
        { id: 2, icon: <FaRegComments size={40} className="text-[#9a031e]" />, label: "Total Posts", value: 8500 },
        { id: 3, icon: <FaUserFriends size={40} className="text-[#fb8b24]" />, label: "Daily Active Users", value: 3200 },
        { id: 4, icon: <FaSignal size={40} className="text-[#e36414]" />, label: "Online Now", value: 450 },
    ];

    return (
        <section className="py-8 bg-gray-50 text-[#5f0f40]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Community Stats</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition duration-300"
                        >
                            <div className="mb-4">{stat.icon}</div>
                            <h3 className="text-2xl md:text-3xl font-bold">
                                <CountUp end={stat.value} duration={2.5} separator="," />
                            </h3>
                            <p className="mt-2 text-lg font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityStats;
