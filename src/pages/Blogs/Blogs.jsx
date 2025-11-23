import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "../../components/PostCard/PostCard";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";

const Blog = () => {
    const axiosSecure = useAxiosSecure();

    const [searchInput, setSearchInput] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("latest");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // ------------------- Fetch Posts -------------------
    const { data: posts = [], isLoading: postsLoading } = useQuery({
        queryKey: ["allPosts", searchTag, category],
        queryFn: async () => {
            if (searchTag) {
                const res = await axiosSecure.get(`/posts/tag/${searchTag}`);
                return res.data;
            } else {
                const res = await axiosSecure.get(`/posts?category=${category}`);
                return res.data;
            }
        },
    });

    // ------------------- Fetch Tags -------------------
    const { data: tags = [] } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    // ------------------- Sorting Logic -------------------
    const sortedPosts = React.useMemo(() => {
        let sorted = [...posts];

        if (sort === "latest") {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "popular") {
            sorted.sort(
                (a, b) =>
                    (b.upVote - b.downVote) - (a.upVote - a.downVote)
            );
        }

        return sorted;
    }, [posts, sort]);

    // ------------------- Pagination Logic -------------------
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    const paginatedPosts = sortedPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const handleSearch = () => {
        setSearchTag(searchInput);
        setCurrentPage(1); // search করলে page reset হবে
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    if (postsLoading) return <Loader />;

    const categories = ["Technology", "Programming", "Business", "Lifestyle", "Tutorials"];

    return (
        <div>
            <div className="py-6 mt-14 px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#5f0f40]">
                    Explore the Latest Discussions & Insights
                </h2>
                <p className="text-center text-[#0f4c5c] text-base md:text-lg mt-3 max-w-3xl mx-auto">
                    Dive into trending topics, expert opinions, and community-driven discussions. Stay updated with the newest posts, explore ideas, learn from others, and be part of a growing tech community — all in one place.
                </p>
            </div>

            <div className="max-w-[1300px] mx-auto py-4 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ---------------- LEFT CONTENT ---------------- */}
                <div className="lg:col-span-2">
                    {/* Search */}
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Search by tag..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-[#e36414]/30 focus:ring-2 focus:ring-[#5f0f40]"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-[#5f0f40] text-white font-bold rounded-xl hover:bg-[#9a031e]"
                        >
                            Search
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                            className="p-2 rounded-lg border border-[#fb8b24]/40"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="p-2 rounded-lg border border-[#5f0f40]/40"
                        >
                            <option value="latest">Latest</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedPosts.length === 0 ? (
                            <p className="text-center text-gray-600 col-span-full">No posts found.</p>
                        ) : (
                            paginatedPosts.map((post) => (
                                <motion.div
                                    key={post._id}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PostCard post={post} />
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-10 gap-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-4 py-2 bg-[#5f0f40] text-white rounded-lg disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-4 py-2 bg-[#fb8b24] text-white rounded-lg disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* ---------------- RIGHT SIDEBAR ---------------- */}
                <div className="space-y-8">
                    {/* About Section */}
                    <div className="p-5 bg-white border rounded-2xl shadow">
                        <h3 className="font-bold text-xl text-[#5f0f40] mb-3">About DiscourseHub</h3>
                        <p className="text-sm text-[#0f4c5c]">
                            A modern forum & blog platform for developers.
                            Learn, share & grow together.
                        </p>
                    </div>

                    {/* Popular Posts */}
                    <div className="p-5 bg-white border rounded-2xl shadow">
                        <h3 className="font-bold text-xl text-[#5f0f40] mb-3">🔥 Popular Posts</h3>
                        <ul className="space-y-3">
                            {sortedPosts.slice(0, 5).map((p) => (
                                <li key={p._id} className="hover:text-[#e36414] cursor-pointer">
                                    {p.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tag Cloud */}
                    <div className="p-5 bg-white border rounded-2xl shadow">
                        <h3 className="font-bold text-xl text-[#5f0f40] mb-3">🏷 Tag Cloud</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag._id} className="px-3 py-1 bg-[#fb8b24]/20 text-[#9a031e] text-sm rounded-full">
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="p-5 bg-[#5f0f40] rounded-2xl shadow text-white">
                        <h3 className="font-bold text-xl mb-3">📬 Subscribe Newsletter</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 rounded-lg mb-3 bg-white text-black"
                        />
                        <button className="w-full py-2 rounded-lg bg-[#fb8b24] hover:bg-[#e36414] text-white font-bold">
                            Subscribe
                        </button>
                    </div>

                    {/* Featured Banner */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#9a031e] to-[#fb8b24] text-white shadow">
                        <h3 className="text-xl font-bold">✨ Featured Topic</h3>
                        <p className="text-sm mt-1">Top discussions curated for you.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
