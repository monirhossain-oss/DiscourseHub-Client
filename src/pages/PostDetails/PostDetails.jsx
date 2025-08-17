import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAuth from '../../hooks/useAuth';
import { ArrowLeft } from 'lucide-react';

const PostDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [commentText, setCommentText] = useState('');

    // fetch post
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // fetch comments
    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            if (!user) return [];
            const res = await axiosSecure.get(`/comments/${id}`);
            return res.data;
        },
        enabled: !!user && !!id,
    });

    // upvote
    const upvoteMutation = useMutation({
        mutationFn: () => axiosSecure.patch(`/posts/${id}/upvote`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post', id] }),
    });

    // downvote
    const downvoteMutation = useMutation({
        mutationFn: () => axiosSecure.patch(`/posts/${id}/downvote`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post', id] }),
    });

    // add comment
    const addCommentMutation = useMutation({
        mutationFn: (newComment) => axiosSecure.post('/comments', newComment),
        onSuccess: () => {
            setCommentText('');
            refetchComments();
            setIsCommentModalOpen(false);
        },
    });

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to comment');
            return;
        }
        if (!commentText.trim()) return;

        addCommentMutation.mutate({
            postId: id,
            authorName: user.displayName,
            authorImage: user.photoURL,
            authorEmail: user.email,
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-6 mb-10 p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                        <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="w-3/4 h-5 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2 mb-4">
                    <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between border-t pt-3">
                    <div className="flex gap-4">
                        <div className="w-8 h-3 bg-gray-200 rounded"></div>
                        <div className="w-8 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!post) return <div className="text-center py-10">Post not found</div>;

    const shareUrl = window.location.href;

    const timeAgo = (date) => {
        const now = new Date();
        const postedDate = new Date(date);
        const diff = Math.floor((now - postedDate) / 1000);

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

        return postedDate.toLocaleDateString();
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-6 mb-10">
            {/* Author */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex">
                    <img
                        src={post.authorImage || '/placeholder-user.png'}
                        alt={post.authorName}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <p className="font-semibold text-gray-900">{post.authorName || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                    </div>
                </div>
                <Link to="/">
                    <ArrowLeft className="hover:bg-gray-200 p-1 rounded-full cursor-pointer" />
                </Link>
            </div>

            {/* Title */}
            <h1 className="px-4 pt-4 text-2xl font-bold text-gray-900">{post.title}</h1>

            {/* Description */}
            <p className="px-4 py-3 text-gray-800 whitespace-pre-wrap">{post.description}</p>

            {/* Tags */}
            <div className="px-4 mb-4">
                {post.tags &&
                    post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2"
                        >
                            #{tag}
                        </span>
                    ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-b text-gray-700">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => upvoteMutation.mutate()}
                        disabled={upvoteMutation.isLoading}
                        className="flex items-center gap-1 hover:text-blue-600"
                    >
                        <FiThumbsUp size={20} /> {post.upVote || 0}
                    </button>

                    <button
                        onClick={() => downvoteMutation.mutate()}
                        disabled={downvoteMutation.isLoading}
                        className="flex items-center gap-1 hover:text-red-600"
                    >
                        <FiThumbsDown size={20} /> {post.downVote || 0}
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCommentModalOpen(true)}
                        className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full text-blue-600 hover:underline"
                    >
                        Comment
                    </button>
                    <FacebookShareButton url={shareUrl} quote={post.title}>
                        <FacebookIcon size={28} round />
                    </FacebookShareButton>
                </div>
            </div>

            {/* Comments */}
            <div className="p-4 max-h-96 overflow-y-auto">
                <h3 className="font-semibold mb-3 text-gray-900">Comments</h3>
                {comments.length === 0 && <p className="text-gray-500 text-sm">No comments yet.</p>}
                {comments.map((comment) => (
                    <div key={comment._id} className="flex items-start gap-3 mb-4">
                        <img
                            src={comment.authorImage || '/placeholder-user.png'}
                            alt={comment.authorName}
                            className="w-8 h-8 rounded-full mt-1"
                        />
                        <div>
                            <p className="font-semibold text-sm">{comment.authorName}</p>
                            <p className="text-xs text-gray-400 mb-1">{timeAgo(comment.createdAt)}</p>
                            <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comment Modal */}
            {isCommentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setIsCommentModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
                        {user ? (
                            <form onSubmit={handleAddComment}>
                                <textarea
                                    className="w-full border rounded p-2 mb-4"
                                    rows="4"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write your comment..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                    disabled={addCommentMutation.isLoading}
                                >
                                    {addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
                                </button>
                            </form>
                        ) : (
                            <p className="text-red-500">
                                You need to <Link to="/login" className="underline">login</Link> to comment.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;
