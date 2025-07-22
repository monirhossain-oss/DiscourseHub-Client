// PostListSection.jsx
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PostCard from '../../components/PostCard/PostCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PostListSection = () => {
    const axiosSecure = useAxiosSecure();
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/posts');
            return res.data;
        }
    });

    const sortedPosts = useMemo(() => {
        if (sortByPopularity) {
            return [...posts].sort((a, b) => (b.upVote - b.downVote) - (a.upVote - a.downVote));
        }
        return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [posts, sortByPopularity]);

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading posts...</div>;

    return (
        <section className=" bg-gray-300 rounded-2xl p-4 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center w-full">📚 Latest Posts</h2>
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setSortByPopularity(!sortByPopularity)}
                    className="bg-gradient-to-r from-green-300 via-red-500 to-white text-black  font-semibold  hover:bg-gray-300 cursor-pointer px-4 py-2 rounded hover:opacity-90 transition"
                >
                    {sortByPopularity ? 'Sort by Newest' : 'Sort by Popularity'}
                </button>
            </div>

            {currentPosts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentPosts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full hover:bg-gray-400 cursor-pointer disabled:opacity-50"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 rounded-full border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } transition`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full hover:bg-gray-400 cursor-pointer disabled:opacity-50"
                        aria-label="Next Page"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default PostListSection;
