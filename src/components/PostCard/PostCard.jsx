import React from 'react';
import { Link } from 'react-router'; // ঠিক করলাম
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={post.authorImage || '/placeholder-user.png'}
                    alt={post.authorName || 'Unknown'}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">{post.authorName || 'Unknown Author'}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>

            {/* Title */}
            <Link to={`/posts/${post._id}`}>
                <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
                    {post.title}
                </h3>
            </Link>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-3 whitespace-pre-wrap">
                {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Reactions */}
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <FiThumbsUp /> {post.upVote || 0}
                    </div>
                    <div className="flex items-center gap-1">
                        <FiThumbsDown /> {post.downVote || 0}
                    </div>
                </div>
                <Link
                    to={`/posts/${post._id}`} // এখানে ঠিক করে দিলাম
                    className="text-blue-600 hover:underline text-sm"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
