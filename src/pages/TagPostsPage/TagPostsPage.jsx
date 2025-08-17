import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PostCard from '../../components/PostCard/PostCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TagPostsPage = () => {
    const { tagName } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: posts = [], isLoading, isError } = useQuery({
        queryKey: ['posts', 'tag', tagName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/tag/${tagName}`);
            return res.data;
        },
        enabled: !!tagName,
    });

    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load posts.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Tag Title with Gradient */}
            <h1
                className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent select-none"
            >
                #{tagName}
            </h1>

            {/* Posts Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md p-4">
                            <div className="mb-4">
                                <Skeleton height={20} width={`70%`} />
                                <Skeleton height={14} width={`50%`} className="mt-2" />
                            </div>
                            <Skeleton count={3} className="mt-2" />
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-600">No posts found for this tag.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagPostsPage;
