import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import AddTag from "../AddTag";
import Loader from "../../../../components/Loader/Loader";
import {Users, FileText, MessageSquare} from "lucide-react";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adminData = {}, isLoading } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-profile");
            return res.data;
        },
    });

    const COLORS = ["#5F0F40", "#9A031E", "#FB8B24"];

    const chartData = [
        { name: "Users", value: adminData?.users },
        { name: "Posts", value: adminData?.posts },
        { name: "Comments", value: adminData?.comments },
    ];
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="min-h-screen bg-[#faf7f5] p-4 lg:p-8 space-y-10">

            {/* --------- TOP ADMIN PROFILE --------- */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#fb8b24]/10  shadow-xl p-8 flex flex-col lg:flex-row items-center gap-8"
            >
                {/* LEFT IMAGE */}
                <div className="relative">
                    <img
                        src={user?.photoURL}
                        alt="Admin"
                        className="w-36 h-36 object-cover rounded-full border-4 shadow-lg border-[#5F0F40]"
                    />

                    <span
                        className="absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded-full shadow"
                        style={{ background: "#5F0F40" }}
                    >
                        Admin
                    </span>
                </div>

                {/* RIGHT TEXT */}
                <div className="flex-1 text-center lg:text-left space-y-2">
                    <h1 className="text-3xl font-bold text-[#5F0F40]">
                        {user?.displayName}
                    </h1>
                    <p className="text-gray-600 text-sm">{user?.email}</p>

                    <p className="text-gray-700 mt-4 leading-relaxed">
                        I am responsible for managing users, monitoring content, analyzing
                        post trends and keeping the platform fast, secure and optimized.
                    </p>
                </div>
            </motion.div>

            {/* --------- 3 STAT CARDS --------- */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* USERS */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6  rounded-xl bg-[#5F0F40] border-l-8 border-[#FB8B24]"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Total Users</h3>
                        <Users className="w-10 h-10 text-[#FB8B24]" />
                    </div>
                    <p className="text-4xl font-bold mt-3 text-[#FB8B24]">
                        {adminData?.users}
                    </p>
                </motion.div>

                {/* POSTS */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6  rounded-xl bg-[#951a66] border-l-8 border-[#FB8B24]"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Total Posts</h3>
                        <FileText className="w-10 h-10 text-[#FB8B24]" />
                    </div>
                    <p className="text-4xl font-bold mt-3 text-[#FB8B24]">
                        {adminData?.posts}
                    </p>
                </motion.div>

                {/* COMMENTS */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6  rounded-xl bg-[#911a63] border-l-8 border-[#FB8B24]"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Total Comments</h3>
                        <MessageSquare className="w-10 h-10 text-[#FB8B24]" />
                    </div>
                    <p className="text-4xl font-bold mt-3 text-[#FB8B24]">
                        {adminData?.comments}
                    </p>
                </motion.div>

            </div>


            {/* --------- PIE CHART --------- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-[#fb8b24]/10 p-8  shadow-xl"
            >
                <h3 className="text-xl font-semibold text-center mb-6 text-[#5F0F40]">
                    Site Analytics Overview
                </h3>

                <div className="flex justify-center">
                    <PieChart width={380} height={380}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </motion.div>

            {/* --------- ADD TAG --------- */}
            <div className="bg-[#fb8b24]/10 shadow-lg rounded-2xl">
                <AddTag />
            </div>
        </div>
    );
};

export default AdminProfile;
