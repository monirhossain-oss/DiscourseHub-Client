import React from 'react';
import { Link } from 'react-router';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FaCommentDots } from 'react-icons/fa';

const PostCard = ({ post }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-5 flex flex-col justify-between h-full border border-[#e36414]/30">
            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={post.authorImage || "/placeholder-user.png"}
                    alt={post.authorName || "Unknown"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#9a031e]"
                />
                <div>
                    <p className="font-semibold text-[#5f0f40]">{post.authorName || "Unknown Author"}</p>
                    <p className="text-xs text-[#0f4c5c]">{formattedDate}</p>
                </div>
            </div>

            {/* Title */}
            <Link to={`/posts/${post._id}`}>
                <h3 className="text-lg md:text-xl font-bold text-[#5f0f40] mb-2 hover:text-[#9a031e] transition line-clamp-2">
                    {post.title}
                </h3>
            </Link>

            {/* Description */}
            <p className="text-sm text-[#0f4c5c] line-clamp-3 mb-3 whitespace-pre-wrap">
                {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-xs bg-gradient-to-r from-[#fb8b24]/20 to-[#9a031e]/20 text-[#9a031e] px-2 py-0.5 rounded-full font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Reactions */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e36414]/20">
                <div className="flex items-center gap-4 text-sm text-[#0f4c5c]">
                    <div className="flex items-center gap-1 hover:text-[#9a031e] transition">
                        <FiThumbsUp /> {post.upVote || 0}
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#9a031e] transition">
                        <FiThumbsDown /> {post.downVote || 0}
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#9a031e] transition">
                        <FaCommentDots /> {post.commentsCount || 0}
                    </div>
                </div>
                <Link
                    to={`/posts/${post._id}`}
                    className="text-[#9a031e] hover:text-[#fb8b24] hover:underline text-sm font-medium transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
