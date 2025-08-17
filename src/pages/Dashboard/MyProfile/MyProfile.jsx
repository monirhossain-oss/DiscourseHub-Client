import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PostCard from '../../../components/PostCard/PostCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userInfo = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['recentPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}&limit=3`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (userLoading || postsLoading) {
        return (
            <div className="p-4 bg-gray-200">
                {/* Profile Skeleton */}
                <div className="bg-white p-6 rounded shadow mb-6 max-w-sm mx-auto">
                    <div className="flex justify-center mb-4">
                        <Skeleton circle width={96} height={96} />
                    </div>
                    <Skeleton width={140} height={20} className="mx-auto mb-2" />
                    <Skeleton width={180} height={16} className="mx-auto mb-2" />
                    <Skeleton width={100} height={20} className="mx-auto" />
                </div>

                {/* Posts Skeleton */}
                <div className="bg-gray-300 p-6 rounded shadow">
                    <Skeleton width={200} height={24} className="mx-auto mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md p-4">
                                <Skeleton height={150} className="mb-2" />
                                <Skeleton width={`80%`} height={20} className="mb-1" />
                                <Skeleton count={2} className="mb-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-100">
            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded shadow mb-6 max-w-sm mx-auto"
            >
                <img
                    src={userInfo.photoURL || user?.photoURL || 'https://i.ibb.co/0jqHpnp/user.png'}
                    alt={userInfo.name || user?.displayName}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-center">{userInfo.name || user?.displayName}</h2>
                <p className="text-gray-600 text-center">{userInfo.email || user?.email}</p>
                <p className="mt-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-white ${userInfo.isMember ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                        {userInfo.isMember ? 'Gold Badge' : 'Bronze Badge'}
                    </span>
                </p>
            </motion.div>

            {/* Recent Posts Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" p-6 "
            >
                <h3 className="text-2xl text-blue-600 font-bold mb-4 text-center">Your Recent Posts</h3>
                {recentPosts.length === 0 ? (
                    <p className="text-gray-600 text-center">You have no posts yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentPosts.map(post => (
                            <motion.div
                                key={post._id}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <PostCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MyProfile;
