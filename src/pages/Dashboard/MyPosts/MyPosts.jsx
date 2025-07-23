import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [activePostId, setActivePostId] = useState(null);
    const [readMoreComment, setReadMoreComment] = useState(null);

    const { data: posts = [], isLoading: loadingPosts } = useQuery({
        queryKey: ['userPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: comments = [], isLoading: loadingComments } = useQuery({
        queryKey: ['comments', activePostId],
        queryFn: async () => {
            if (!activePostId) return [];
            const res = await axiosSecure.get(`/comments/${activePostId}`);
            return res.data;
        },
        enabled: !!activePostId,
    });

    const deletePostMutation = useMutation({
        mutationFn: async (postId) => {
            const res = await axiosSecure.delete(`/posts/${postId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
            queryClient.invalidateQueries(['userPosts', user?.email]);
            setActivePostId(null);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to delete post.', 'error');
        },
    });

    const feedbackMutation = useMutation({
        mutationFn: async ({ commentId, feedback }) => {
            const res = await axiosSecure.patch(`/comments/${commentId}/feedback`, { feedback });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', activePostId]);
        },
    });

    const handleDeletePost = (postId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete your post permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePostMutation.mutate(postId);
            }
        });
    };

    const handleFeedbackChange = (commentId, e) => {
        const feedback = e.target.value;
        feedbackMutation.mutate({ commentId, feedback });
    };

    if (loadingPosts) {
        return <p className="text-center py-8">Loading posts...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">My Posts</h1>

            {posts.length === 0 ? (
                <p className="text-center text-gray-600">You have no posts.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Vote Count (Up - Down)</th>
                            <th className="border border-gray-300 px-4 py-2">Comments</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{post.upVote} - {post.downVote}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => setActivePostId(post._id)}
                                        className="btn btn-sm btn-info"
                                    >
                                        View Comments
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activePostId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white w-full max-w-4xl rounded shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Comments</h2>
                        <button
                            onClick={() => setActivePostId(null)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        {loadingComments ? (
                            <p>Loading comments...</p>
                        ) : comments.length === 0 ? (
                            <p>No comments found.</p>
                        ) : (
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">Commenter Email</th>
                                        <th className="border border-gray-300 px-4 py-2">Comment Text</th>
                                        <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                        <th className="border border-gray-300 px-4 py-2">Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.map(comment => {
                                        const isLongComment = comment.text.length > 20;
                                        const feedbackGiven = !!comment.feedback;
                                        console.log(comment)

                                        return (
                                            <tr key={comment._id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2 break-words">{comment.authorEmail}</td>
                                                <td className="border border-gray-300 px-4 py-2 break-words">
                                                    {isLongComment ? (
                                                        <>
                                                            {comment.text.slice(0, 20)}...
                                                            <button
                                                                onClick={() => setReadMoreComment(comment.text)}
                                                                className="text-blue-600 ml-2 underline text-sm"
                                                            >
                                                                Read More
                                                            </button>
                                                        </>
                                                    ) : (
                                                        comment.text
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    <select
                                                        disabled={feedbackGiven}
                                                        defaultValue={comment.feedback || ''}
                                                        onChange={(e) => handleFeedbackChange(comment._id, e)}
                                                        className="select select-bordered w-full max-w-[150px]"
                                                    >
                                                        <option value="">Select Feedback</option>
                                                        <option value="helpful">Helpful</option>
                                                        <option value="notHelpful">Not Helpful</option>
                                                        <option value="neutral">Neutral</option>
                                                    </select>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    <button
                                                        disabled={!feedbackGiven}
                                                        className={`btn btn-sm btn-warning ${!feedbackGiven ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        onClick={() => Swal.fire('Reported', 'Thank you for your report.', 'success')}
                                                    >
                                                        Report
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}

                        {readMoreComment && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
                                <div className="bg-white rounded p-6 max-w-lg w-full relative">
                                    <button
                                        onClick={() => setReadMoreComment(null)}
                                        className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-black"
                                    >
                                        &times;
                                    </button>
                                    <p>{readMoreComment}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPosts;
