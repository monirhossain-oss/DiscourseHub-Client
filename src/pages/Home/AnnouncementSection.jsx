import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Announcements = () => {
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], isLoading, isError } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/announcements");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-t-[#5f0f40] border-b-[#e36414] border-gray-200 rounded-full animate-spin"></div>
                <h2 className="mt-4 text-xl font-bold text-[#5f0f40]">Loading Announcements...</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12 text-red-500">
                Failed to load announcements. Please try again later.
            </div>
        );
    }

    // Limit to latest 6 announcements
    const latestAnnouncements = announcements.slice(0, 6);

    return (
        <section className="py-12 bg-[#e36414]/10">
            <div className="max-w-[1244px] mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5f0f40] mb-8">
                    Announcements
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {latestAnnouncements.map((ann) => (
                        <div
                            key={ann._id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-[#9a031e] mb-2">
                                {ann.title}
                            </h3>
                            <p className="text-sm text-[#0f4c5c] mb-4">{ann.description}</p>
                            <span className="text-xs text-gray-500">
                                {new Date(ann.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Announcements;
