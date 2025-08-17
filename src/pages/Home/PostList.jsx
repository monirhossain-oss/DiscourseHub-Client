import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PostCard from '../../components/PostCard/PostCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostListSection = () => {
    const axiosSecure = useAxiosSecure();
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const [maxHeight, setMaxHeight] = useState(0);
    const cardRefs = useRef([]);

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

    // Calculate max card height
    useEffect(() => {
        if (cardRefs.current.length) {
            const heights = cardRefs.current.map(ref => ref?.offsetHeight || 0);
            setMaxHeight(Math.max(...heights));
        }
    }, [currentPosts]);

    // Motion Variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }
    };

    const paginationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    };

    const pageButtonVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
        hover: { scale: 1.1, backgroundColor: '#2563EB', color: '#fff', transition: { duration: 0.2 } }
    };

    return (
        <motion.section
            className="p-4 my-8"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div
                className="flex justify-between items-center mb-4"
                variants={buttonVariants}
            >
                <h2 className="text-3xl text-blue-600 font-bold text-center w-full">📚 Latest Posts</h2>
            </motion.div>

            {/* Sort Button */}
            <motion.div className="flex justify-end mb-4" variants={buttonVariants}>
                <motion.button
                    onClick={() => setSortByPopularity(!sortByPopularity)}
                    variants={buttonVariants}
                    whileHover="hover"
                    className="outline-2 outline-gray-400 text-blue-600 font-semibold hover:bg-gray-300 cursor-pointer px-4 py-2 rounded-3xl hover:opacity-90 transition"
                >
                    {sortByPopularity ? 'Sort by Newest' : 'Sort by Popularity'}
                </motion.button>
            </motion.div>

            {/* Posts Grid or Skeleton Loader */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                    {[...Array(postsPerPage)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md  p-4 flex flex-col"
                        >
                            <Skeleton height={180} className="mb-4 rounded-lg" />
                            <Skeleton width={`80%`} height={20} className="mb-2" />
                            <Skeleton count={2} />
                            <div className="flex justify-between items-center mt-4">
                                <Skeleton circle width={40} height={40} />
                                <Skeleton width={80} height={20} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : currentPosts.length === 0 ? (
                <motion.p className="text-center text-gray-500" variants={cardVariants}>No posts available.</motion.p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
                    variants={sectionVariants}
                >
                    {currentPosts.map((post, index) => (
                        <motion.div
                            ref={el => cardRefs.current[index] = el}
                            key={post._id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
                            className="cursor-pointer flex flex-col"
                            style={{ minHeight: maxHeight }}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <motion.div
                    className="flex justify-center items-center gap-2 mt-8"
                    variants={paginationVariants}
                >
                    <motion.button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full hover:bg-gray-400 cursor-pointer disabled:opacity-50"
                        aria-label="Previous Page"
                        variants={pageButtonVariants}
                        whileHover="hover"
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    {[...Array(totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                            <motion.button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 rounded-full border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition`}
                                variants={pageButtonVariants}
                                whileHover="hover"
                            >
                                {pageNum}
                            </motion.button>
                        );
                    })}

                    <motion.button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full hover:bg-gray-400 cursor-pointer disabled:opacity-50"
                        aria-label="Next Page"
                        variants={pageButtonVariants}
                        whileHover="hover"
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </motion.div>
            )}
        </motion.section>
    );
};

export default PostListSection;
