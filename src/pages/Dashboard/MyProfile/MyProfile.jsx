import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PostCard from '../../../components/PostCard/PostCard'; // ✅ Import your PostCard

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
        return <p className="text-center py-8">Loading...</p>;
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded shadow mb-6 max-w-sm mx-auto">
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
            </div>

            {/* Recent Posts Grid */}
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-bold mb-4 text-center">Your Recent Posts</h3>
                {recentPosts.length === 0 ? (
                    <p className="text-gray-600 text-center">You have no posts yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentPosts.map(post => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
