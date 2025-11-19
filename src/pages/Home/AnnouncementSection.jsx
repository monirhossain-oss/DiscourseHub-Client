import React from "react";

const Announcements = () => {
    const announcements = [
        {
            title: "New Feature Released!",
            description: "Now you can filter discussions by popularity.",
            date: "Nov 19, 2025",
        },
        {
            title: "Maintenance Scheduled",
            description: "Server will be down tomorrow from 2-4 AM.",
            date: "Nov 18, 2025",
        },
        {
            title: "Community Guidelines Updated",
            description: "Please check the latest rules to ensure smooth discussions.",
            date: "Nov 17, 2025",
        },
    ];

    return (
        <section className="py-12 bg-[#e36414]/10">
            <div className="max-w-[1244px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5f0f40] mb-8">
                    Announcements
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((ann, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-[#9a031e] mb-2">
                                {ann.title}
                            </h3>
                            <p className="text-sm text-[#0f4c5c] mb-4">{ann.description}</p>
                            <span className="text-xs text-gray-500">{ann.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Announcements;
