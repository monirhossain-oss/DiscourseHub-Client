import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import AddTag from "../AddTag";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: adminData = {}, isLoading } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-profile");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-4 lg:p-10">
                {/* Profile Card Skeleton */}
                <div className="rounded-3xl flex flex-col lg:flex-row items-center gap-8 animate-pulse">
                    <div className="flex flex-col bg-gradient-to-t from-orange-200 via-amber-100 to-orange-200 items-center gap-4 p-6 rounded-2xl shadow-md w-full mx-auto lg:w-1/2">
                        {/* Profile Image Skeleton */}
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300"></div>

                        {/* Name & Email Skeleton */}
                        <div className="text-center space-y-2">
                            <div className="h-6 w-40 bg-gray-300 mx-auto rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 mx-auto rounded"></div>
                        </div>

                        {/* Statistics Skeleton */}
                        <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-center space-y-2">
                                    <div className="h-6 w-10 bg-gray-300 mx-auto rounded"></div>
                                    <div className="h-4 w-12 bg-gray-200 mx-auto rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chart Skeleton */}
                <div className="mt-10 bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl p-8 animate-pulse">
                    <div className="h-6 w-48 bg-gray-300 mx-auto mb-6 rounded"></div>
                    <div className="flex justify-center">
                        <div className="w-64 h-64 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    const chartData = [
        { name: "Users", value: adminData.users },
        { name: "Posts", value: adminData.posts },
        { name: "Comments", value: adminData.comments },
    ];

    const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

    return (
        <div className="min-h-screen bg-gray-100 p-4 lg:p-10">
            {/* Admin Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl flex flex-col lg:flex-row items-center gap-8"
            >
                <div className="flex flex-col bg-gradient-to-t from-gray-200 via-white to-gray-300 items-center gap-4 p-6 rounded-2xl shadow-md w-full mx-auto lg:w-1/2">
                    {/* Profile Image & Badge */}
                    <div className="relative">
                        <img
                            src={user?.photoURL}
                            alt="Admin"
                            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full shadow-lg object-cover ring-4 ring-blue-600"
                        />
                        <span className="absolute bottom-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow">
                            Admin
                        </span>
                    </div>

                    {/* Name & Email */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">{user?.displayName}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-indigo-600">{adminData?.users}</h3>
                            <p className="text-sm text-gray-600">Users</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-green-600">{adminData?.posts}</h3>
                            <p className="text-sm text-gray-600">Posts</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600">{adminData?.comments}</h3>
                            <p className="text-sm text-gray-600">Comments</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8"
            >
                <h3 className="text-xl font-bold text-center text-gray-700 mb-6">
                    📊 Site Statistics Overview
                </h3>
                <div className="flex w-full justify-center">
                    <PieChart width={320} height={320}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </motion.div>

            <AddTag />
        </div>
    );
};

export default AdminProfile;
