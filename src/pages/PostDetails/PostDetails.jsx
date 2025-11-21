import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FacebookIcon, FacebookShareButton } from "react-share";
import PostCard from "../../components/PostCard/PostCard";
import Loader from "../../components/Loader/Loader";

const PostDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const [isCommentBox, setIsCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [replyBox, setReplyBox] = useState(null);
    const [replyText, setReplyText] = useState("");

    const { data: post, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${id}`);
            return res.data;
        }
    });

    const { data: relatedTagPosts = [] } = useQuery({
        queryKey: ["relatedTagPosts", post?.tags],
        enabled: !!post?.tags?.length,
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/tag/${post.tags[0]}`);
            return res.data.filter(p => p._id !== id);
        }
    });

    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${id}`);
            return res.data;
        }
    });

    const upvoteMutation = useMutation({
        mutationFn: () => axiosSecure.patch(`/posts/${id}/upvote`),
        onSuccess: () => queryClient.invalidateQueries(["post", id]),
    });

    const downvoteMutation = useMutation({
        mutationFn: () => axiosSecure.patch(`/posts/${id}/downvote`),
        onSuccess: () => queryClient.invalidateQueries(["post", id]),
    });

    const addCommentMutation = useMutation({
        mutationFn: (payload) => axiosSecure.post("/comments", payload),
        onSuccess: () => {
            setCommentText("");
            setIsCommentBox(false);
            refetchComments();
        }
    });

    const replyMutation = useMutation({
        mutationFn: (payload) => axiosSecure.post("/comments/reply", payload),
        onSuccess: () => {
            setReplyText("");
            setReplyBox(null);
            refetchComments();
        }
    });

    const commentReactionMutation = useMutation({
        mutationFn: ({ id, type }) =>
            axiosSecure.patch(`/comments/${id}/${type}`),
        onSuccess: () => refetchComments(),
    });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id])

    const handleAddComment = () => {
        if (!user) return alert("Please login");
        addCommentMutation.mutate({
            postId: post._id,
            text: commentText,
            authorName: user.displayName,
            authorImage: user.photoURL,
            authorEmail: user.email,
            createdAt: new Date().toISOString(),
        });
    };

    const handleReplySubmit = (commentId) => {
        if (!replyText.trim()) return;
        replyMutation.mutate({
            commentId,
            text: replyText,
            authorName: user.displayName,
            authorImage: user.photoURL,
            authorEmail: user.email,
            createdAt: new Date().toISOString(),
        });
    };

    if (isLoading) return <div className="text-center py-10"><Loader></Loader></div>;
    if (!post) return <div>Post not found</div>;

    const shareUrl = window.location.href;

    return (
        <div className="max-w-7xl my-4 mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
                <img
                    src={post.featuredImage}
                    className="w-full h-50 md:h-110"
                />
                <h1 className="text-4xl font-bold text-[#5f0f40] mt-4">{post.title}</h1>

                <div className="mt-3 flex items-center gap-4 flex-wrap text-[#0f4c5c]">
                    <img src={post.authorImage} className="w-12 h-12 rounded-full border-2 border-[#e36414]" />
                    <div>
                        <p className="font-semibold">{post.authorName}</p>
                        <p className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#e36414] text-white rounded-full">{post.category}</span>
                </div>

                <p className="mt-6 text-lg text-[#0f4c5c]">{post.shortDescription}</p>

                <div className="mt-6 p-4 rounded-xl bg-[#fb8b24]/10 border border-[#fb8b24]/30">
                    <p className="leading-7 text-[#0f4c5c] whitespace-pre-line">{post.fullContent}</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mt-8">
                    <div className="flex items-center gap-4 md:gap-6">
                        <button
                            onClick={() => upvoteMutation.mutate()}
                            className="flex items-center gap-2 px-4 py-2 bg-[#5f0f40] text-white rounded-lg hover:bg-[#9a031e]"
                        >
                            <FiThumbsUp /> {post.upVote}
                        </button>
                        <button
                            onClick={() => downvoteMutation.mutate()}
                            className="flex items-center gap-2 px-4 py-2 bg-[#5f0f40] text-white rounded-lg hover:bg-[#9a031e]"
                        >
                            <FiThumbsDown /> {post.downVote}
                        </button>
                    </div>

                    <div>
                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-[#5f0f40]">
                        💬 {comments.length} Comments
                    </h2>
                </div>

                {/* Comments Section */}
                <div className="mt-10">
                    <button
                        onClick={() => setIsCommentBox(true)}
                        className="px-4 py-2 bg-[#5f0f40] text-white rounded-lg hover:bg-[#9a031e]"
                    >
                        Write a Comment
                    </button>

                    {isCommentBox && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <textarea
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="Write your comment..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="mt-2 px-4 py-2 bg-[#e36414] text-white rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    <div className="mt-6 space-y-6">
                        {comments.map((c) => (
                            <div key={c._id} className="p-4 border border-[#fb8b24]/40 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <img src={c.authorImage} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-bold text-[#5f0f40]">{c.authorName}</p>
                                        <p className="text-xs text-[#0f4c5c]">{new Date(c.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="mt-2 text-[#0f4c5c]">{c.text}</p>
                                <div className="mt-3 flex items-center gap-4 text-sm">
                                    <button
                                        onClick={() => commentReactionMutation.mutate({ id: c._id, type: "like" })}
                                        className="flex items-center gap-1 text-[#5f0f40]"
                                    >
                                        <FiThumbsUp /> {c.likes || 0}
                                    </button>
                                    <button
                                        onClick={() => commentReactionMutation.mutate({ id: c._id, type: "dislike" })}
                                        className="flex items-center gap-1 text-[#5f0f40]"
                                    >
                                        <FiThumbsDown /> {c.dislikes || 0}
                                    </button>
                                    <button
                                        onClick={() => setReplyBox(c._id)}
                                        className="text-[#e36414] font-semibold"
                                    >
                                        Reply
                                    </button>
                                </div>

                                {replyBox === c._id && (
                                    <div className="mt-3 pl-6">
                                        <textarea
                                            rows={2}
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="w-full border p-2 rounded"
                                            placeholder="Write a reply..."
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(c._id)}
                                            className="mt-2 px-3 py-1 bg-[#5f0f40] text-white rounded"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                )}

                                {c.replies?.length > 0 && (
                                    <div className="mt-3 pl-8 space-y-3">
                                        {c.replies.map((r) => (
                                            <div key={r._id} className="border-l-4 border-[#fb8b24] pl-3">
                                                <p className="font-semibold text-[#5f0f40]">{r.authorName}</p>
                                                <p className="text-sm text-[#0f4c5c]">{r.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">
                <div className="p-4 border border-[#e36414]/40 bg-white shadow-sm">
                    <h3 className="text-xl font-bold text-[#5f0f40] mb-4">🏷️ Related by Tag</h3>
                    <div className="space-y-4">
                        {relatedTagPosts.length === 0 && (
                            <p className="text-[#0f4c5c] text-sm">No related posts</p>
                        )}
                        {relatedTagPosts.map((p) => (
                            <PostCard key={p._id} post={p} />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default PostDetails;
