import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const TagsSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    // Loading UI
    if (isLoading) {
        return (
            <div className="px-6 py-12 max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-[#5f0f40] tracking-wide">
                    <Skeleton width={150} height={30} style={{ margin: "0 auto" }} />
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl shadow-md px-4 py-3 flex justify-center items-center bg-white"
                        >
                            <Skeleton width={80} height={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Main UI
    return (
        <div className="px-6 py-12 max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-[#5f0f40] tracking-wide">
                Popular Tags
            </h2>

            {/* Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tags.map((tag) => (
                    <Link
                        key={tag._id}
                        to={`/tags/${encodeURIComponent(tag.name)}`}
                        className="
                            bg-[#fb8b24]/15
                            px-4 py-3 
                            font-medium 
                            text-[#0f4c5c] 
                            text-sm 
                            shadow-sm 
                            flex justify-center items-center 
                            hover:bg-[#ba0d2d] 
                            hover:text-white 
                            hover:shadow-lg 
                            hover:transition-all hover:duration-300 
                            active:scale-95
                            border border-[#e36414]/30
                        "
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagsSection;
