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
        <div className="bg-gray-100 mt-8 p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Search Results for: "{searchedTag}"
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded shadow p-4 border border-blue-200"
                        >
                            <Skeleton width={`70%`} height={20} className="mb-2" />
                            <Skeleton count={3} height={14} />
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">
                    No posts found for this tag.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            to={`/posts/${post._id}`}
                            className="block bg-white rounded shadow hover:bg-gray-300 hover:shadow-lg p-4 border border-blue-300 transition"
                        >
                            <h3 className="text-blue-600 font-semibold mb-1 truncate">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3">
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
