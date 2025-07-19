import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 🔹 Fetch user info from DB
    const { data: userInfo = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // 🔹 Fetch last 3 posts
    const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['recentPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}&limit=3`);
            return res.data.posts;
        },
        enabled: !!user?.email
    });

    if (userLoading || postsLoading) {
        return <p className="text-center py-8">Loading...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">

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
                            <div key={post._id} className="border rounded p-4 shadow-sm hover:shadow transition">
                                <h4 className="font-semibold text-lg mb-1">{post.title}</h4>
                                <p className="text-gray-500 text-sm mb-2">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                                <p className="text-gray-700 text-sm mb-2">{post.description.slice(0, 80)}...</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {post.tags?.map(tag => (
                                        <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default MyProfile;
