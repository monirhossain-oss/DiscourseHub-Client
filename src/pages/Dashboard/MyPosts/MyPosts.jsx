import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [activePostId, setActivePostId] = useState(null);
    const [readMoreComment, setReadMoreComment] = useState(null);
    const [selectedFeedbacks, setSelectedFeedbacks] = useState({});

    // Get user posts
    const { data: posts = [], isLoading: loadingPosts } = useQuery({
        queryKey: ['userPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Get comments for selected post
    const { data: comments = [], isLoading: loadingComments } = useQuery({
        queryKey: ['comments', activePostId],
        queryFn: async () => {
            if (!activePostId) return [];
            const res = await axiosSecure.get(`/comments/${activePostId}`);
            return res.data;
        },
        enabled: !!activePostId,
    });

    // Delete post mutation
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

    // Report comment mutation
    const reportCommentMutation = useMutation({
        mutationFn: async ({ commentId, feedback }) => {
            const res = await axiosSecure.patch(`/comments/${commentId}/report`, {
                reported: true,
                reportedByName: user.displayName,
                reportedByEmail: user.email,
                reportedAt: new Date(),
                feedback: feedback
            });

            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Reported!', 'Thank you for reporting.', 'success');
            queryClient.invalidateQueries(['myposts', user?.email]);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to report comment.', 'error');
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
        const newFeedback = e.target.value;
        setSelectedFeedbacks(prev => ({
            ...prev,
            [commentId]: newFeedback
        }));
    };

    const handleReportComment = (commentId) => {
        if (!user?.email) {
            Swal.fire('Error', 'You must be logged in to report.', 'error');
            return;
        }
        const feedback = selectedFeedbacks[commentId] || '';

        if (!feedback) {
            Swal.fire('Error', 'Please select feedback before reporting.', 'error');
            return;
        }

        reportCommentMutation.mutate({
            commentId,
            feedback,
            user
        });
    };

    // Skeleton loader for posts
    if (loadingPosts) {
        return (
            <div className="py-4 px-1 bg-gray-300 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    <Skeleton width={200} />
                </h1>
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="mb-4 p-4 bg-white rounded shadow">
                        <Skeleton height={25} className="mb-2" />
                        <Skeleton height={20} width={100} className="mb-2" />
                        <Skeleton height={30} width={120} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="py-4 px-1 bg-gray-100">
            <h1 className="text-2xl text-blue-600 font-bold mb-6 text-center">My Posts</h1>

            {posts.length === 0 ? (
                <p className="text-center text-gray-600">You have no posts.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Vote Count</th>
                                <th className="border px-4 py-2">Comments</th>
                                <th className="border px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="border px-4 py-2">{post.title}</td>
                                    <td className="border px-4 py-2">{post.upVote} - {post.downVote}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button onClick={() => setActivePostId(post._id)} className="btn btn-info btn-sm">View Comments</button>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button onClick={() => handleDeletePost(post._id)} className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

            {activePostId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white w-full max-w-4xl rounded shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Comments</h2>
                        <button onClick={() => setActivePostId(null)} className="absolute top-4 right-4 text-gray-600 text-2xl">&times;</button>

                        {loadingComments ? (
                            <div>
                                {[...Array(5)].map((_, idx) => (
                                    <div key={idx} className="mb-3 p-2 border rounded">
                                        <Skeleton height={20} width={150} className="mb-1" />
                                        <Skeleton height={15} width={`80%`} />
                                        <Skeleton height={25} width={100} className="mt-1" />
                                    </div>
                                ))}
                            </div>
                        ) : comments.length === 0 ? (
                            <p>No comments found.</p>
                        ) : (
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">Commenter Email</th>
                                        <th className="border px-4 py-2">Comment</th>
                                        <th className="border px-4 py-2">Feedback</th>
                                        <th className="border px-4 py-2">Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.map(comment => {
                                        const isLong = comment.text.length > 20;
                                        const selected = selectedFeedbacks[comment._id] || '';

                                        return (
                                            <tr key={comment._id}>
                                                <td className="border px-4 py-2 break-words">{comment.authorEmail}</td>
                                                <td className="border px-4 py-2 break-words">
                                                    {isLong ? (
                                                        <>
                                                            {comment.text.slice(0, 20)}...
                                                            <button onClick={() => setReadMoreComment(comment.text)} className="text-blue-600 text-sm ml-2 underline">Read More</button>
                                                        </>
                                                    ) : comment.text}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <select
                                                        value={selected}
                                                        onChange={(e) => handleFeedbackChange(comment._id, e)}
                                                        className="select select-bordered w-full max-w-[150px]"
                                                        disabled={comment.reported}
                                                    >
                                                        <option value="">Select Feedback</option>
                                                        <option value="Spam">Spam</option>
                                                        <option value="Offensive">Offensive</option>
                                                        <option value="Irrelevant">Irrelevant</option>
                                                    </select>
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <button
                                                        onClick={() => handleReportComment(comment._id)}
                                                        disabled={!selected || comment.reported}
                                                        className={`btn btn-sm btn-warning ${(!selected || comment.reported) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {comment.reported ? 'Reported' : 'Report'}
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
                                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                                    <button onClick={() => setReadMoreComment(null)} className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black">&times;</button>
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
