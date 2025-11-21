import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchResults = ({ searchedTag }) => {
    const axiosSecure = useAxiosSecure();
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['postsByTag', searchedTag],
        queryFn: async () => {
            if (!searchedTag) return [];
            const res = await axiosSecure.get(`/posts/tag/${searchedTag}`);
            return res.data;
        },
        enabled: !!searchedTag,
    });

    if (!searchedTag) return null;

    return (
        <div className="bg-[#e36414]/10 mt-8 p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-center text-[#5f0f40]">
                Search Results for: "<span className="text-[#9a031e]">{searchedTag}</span>"
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow p-4 border border-[#fb8b24]/30"
                        >
                            <Skeleton width={`70%`} height={20} className="mb-2" />
                            <Skeleton count={3} height={14} />
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p className="text-center text-[#0f4c5c] font-medium">
                    No posts found for this tag.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            to={`/posts/${post._id}`}
                            className="
                                block bg-white shadow 
                                border border-[#fb8b24]/40 
                                p-4 transition 
                                hover:shadow-xl hover:-translate-y-1 
                                hover:bg-[#fb8b24]/10
                            "
                        >
                            <h3 className="text-[#5f0f40] font-semibold mb-1 truncate hover:text-[#9a031e]">
                                {post.title}
                            </h3>

                            <p className="text-[#0f4c5c] text-sm line-clamp-3">
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
