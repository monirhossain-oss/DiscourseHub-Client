import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "../../components/PostCard/PostCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const PostListSection = () => {
    const axiosSecure = useAxiosSecure();
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [postsPerView, setPostsPerView] = useState(4);

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/posts");
            return res.data;
        },
    });

    // Sort posts
    const sortedPosts = useMemo(() => {
        if (sortByPopularity) {
            return [...posts].sort(
                (a, b) => b.upVote - b.downVote - (a.upVote - a.downVote)
            );
        }
        return [...posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }, [posts, sortByPopularity]);

    // Responsive posts per view
    const updatePostsPerView = () => {
        if (window.innerWidth < 640) setPostsPerView(1);
        else if (window.innerWidth < 1024) setPostsPerView(2);
        else setPostsPerView(4);
    };

    useEffect(() => {
        updatePostsPerView();
        window.addEventListener("resize", updatePostsPerView);
        return () => window.removeEventListener("resize", updatePostsPerView);
    }, []);

    const step = 0.25;

    const maxIndex = Math.max(sortedPosts.length - postsPerView, 0);

    const handlePrev = () => setSlideIndex((prev) => Math.max(prev - step, 0));
    const handleNext = () =>
        setSlideIndex((prev) => Math.min(prev + step, maxIndex));

  
    const translateX = (slideIndex * 100) / postsPerView;

    return (
        <section className="p-4 my-4 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl text-[#5f0f40] font-bold text-center w-full">
                    Latest Posts
                </h2>
            </div>

            {/* Sort Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setSortByPopularity(!sortByPopularity);
                        setSlideIndex(0); 
                    }}
                    className="outline-2 outline-gray-400 text-[#5f0f40] font-semibold hover:bg-[#fb8b24]/20 cursor-pointer px-4 py-2 rounded-3xl transition"
                >
                    {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
                </button>
            </div>

            {/* Slider */}
            {isLoading ? (
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(postsPerView)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex-1 min-w-[250px] bg-white rounded-xl shadow-md p-4"
                        >
                            <Skeleton height={180} className="mb-4 rounded-lg" />
                            <Skeleton width={`80%`} height={20} className="mb-2" />
                            <Skeleton count={2} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative overflow-hidden">
                    {/* Arrow buttons */}
                    <button
                        onClick={handlePrev}
                        disabled={slideIndex === 0}
                        className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-[#5f0f40] text-white p-2 rounded-full hover:bg-[#fb8b24] disabled:opacity-50"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={slideIndex >= maxIndex}
                        className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-[#5f0f40] text-white p-2 rounded-full hover:bg-[#fb8b24] disabled:opacity-50"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <motion.div
                        className="flex gap-6 transition-transform duration-500"
                        style={{
                            width: `${(sortedPosts.length / postsPerView) * 100}%`,
                            transform: `translateX(-${translateX}%)`,
                        }}
                    >
                        {sortedPosts.map((post) => (
                            <div
                                key={post._id}
                                className={`flex-1 min-w-[calc(100%/${postsPerView})]`}
                            >
                                <PostCard post={post} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default PostListSection;
