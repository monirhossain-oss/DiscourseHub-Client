import React from "react";
import { FaRegFileAlt, FaStar, FaComments, FaThumbsUp } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/posts");
            return res.data;
        },
    });

    if (isLoading) return <Loader />;

    // Filter current user's posts
    const userPosts = posts.filter(p => p.authorEmail === user.email);

    // Dynamic Stats
    const totalPosts = userPosts.length;

    // Popular post: highest (upVote - downVote)
    const popularPost = userPosts.reduce(
        (max, post) => {
            const score = post.upVote - post.downVote;
            if (score > max.score) return { title: post.title, score };
            return max;
        },
        { title: "N/A", score: 0 }
    );

    // Total comments
    const totalComments = userPosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);

    // Total likes = total upVotes
    const totalLikes = userPosts.reduce((sum, post) => sum + (post.upVote || 0), 0);

    const stats = [
        { name: "Total Posts", count: totalPosts, icon: <FaRegFileAlt />, color: "#9a031e" },
        { name: "Popular Post", count: popularPost.score, icon: <FaStar />, color: "#fb8b24" },
        { name: "Comments", count: totalComments, icon: <FaComments />, color: "#e36414" },
        { name: "Total Likes", count: totalLikes, icon: <FaThumbsUp />, color: "#5f0f40" },
    ];

    // Latest 5 posts for Recent Activity
    const latestPosts = userPosts.slice(0, 5);

    // Chart: month-wise post count
    const getPostsPerMonth = (postsArray) => {
        const monthsCount = Array(12).fill(0);
        postsArray.forEach(post => {
            const month = new Date(post.createdAt).getMonth();
            monthsCount[month]++;
        });
        return monthsCount;
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Posts",
                data: getPostsPerMonth(userPosts),
                borderColor: "#fb8b24",
                backgroundColor: "#fb8b24",
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="p-4 space-y-6 bg-[#fb8b24]/10">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#5f0f40] via-[#951865] to-[#b1207a] text-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl text-center font-bold">Welcome, {user.displayName} !</h1>
                <p className="text-center">
                    Here’s a quick overview of your blog's performance and recent activities. Keep up the great work!
                </p>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 rounded-lg shadow-md"
                        style={{ backgroundColor: stat.color }}
                    >
                        <div>
                            <p className="text-white font-semibold">{stat.name}</p>
                            <p className="text-white text-lg font-bold">{stat.count}</p>
                        </div>
                        <div className="text-white text-3xl">{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Activity + Chart Section */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Recent Activity */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                    <hr className="mb-4" />
                    <ul className="space-y-3">
                        {latestPosts.map((post, idx) => {
                            const titleWords = post.title.split(" ").slice(0, 2).join(" ");
                            const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

                            return (
                                <li key={idx} className="border-b flex items-center justify-between pb-2">
                                    <div>
                                        <p className="font-semibold px-2">{titleWords}</p>
                                        <p className="text-sm bg-amber-100 py-1 px-2 rounded-2xl text-gray-500"># {post.tags.join(", ")}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">{timeAgo}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Dynamic Chart */}
                <div className="md:col-span-5 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Posts Overview</h2>
                    <Line data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Overview;
