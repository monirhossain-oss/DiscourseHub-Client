import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

// Slugify
const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const AddPost = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isPollEnabled, setIsPollEnabled] = useState(false);
    const [status, setStatus] = useState("Draft");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImageURL, setUploadedImageURL] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const titleWatch = watch("title", "");

    // Auto slug
    useEffect(() => {
        setValue("slug", slugify(titleWatch));
    }, [titleWatch, setValue]);

    // Fetch Tags
    const { data: tags = [], isLoading: loadingTags } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    // User Info
    const { data: userInfo = {}, isLoading: loadingUser } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // User Posts Count
    const { data: userPosts = [] } = useQuery({
        queryKey: ["userPosts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const postLimitReached = !userInfo?.isMember && userPosts.length >= 5;

    // Submit Handler
    const onSubmit = async (data) => {
        if (postLimitReached) {
            Swal.fire({
                icon: "warning",
                title: "Post limit reached",
            });
            return;
        }

        // Check if file selected
        if (!data.featuredImageFile || data.featuredImageFile.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Please select an image",
            });
            return;
        }

        try {
            // Upload Image to ImgBB
            const formData = new FormData();
            formData.append("image", data.featuredImageFile[0]);

            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_api_key}`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            const photoURL = res.data.data.url;
            setUploadedImageURL(photoURL);

            const pollOptions = isPollEnabled
                ? [data.pollOption1, data.pollOption2].filter(Boolean)
                : [];

            const postData = {
                authorImage: user.photoURL,
                authorName: user.displayName,
                authorEmail: user.email,
                title: data.title,
                slug: data.slug,
                shortDescription: data.shortDescription,
                fullContent: data.fullContent,
                category: data.category,
                subcategory: data.subcategory,
                tags: [data.tag],
                featuredImage: photoURL,
                isPollEnabled,
                pollQuestion: isPollEnabled ? data.pollQuestion : null,
                pollOptions,
                status,
                scheduledPublishDate:
                    status === "Scheduled" ? data.scheduledDate : null,
                createdAt: new Date().toISOString(),
                upVote: 0,
                downVote: 0,
                commentsCount: 0,
            };

            await axiosSecure.post("/posts", postData);

            Swal.fire({
                icon: "success",
                title: "Post Added Successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            reset();
            setStatus("Draft");
            setIsPollEnabled(false);
            setUploadProgress(0);
            setUploadedImageURL("");
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Post Failed",
            });
        }
    };

    if (loadingUser || loadingTags)
        return (
            <div className="bg-gray-100 p-6 rounded">
                <Skeleton height={30} />
                <Skeleton height={40} count={6} />
            </div>
        );

    return (
        <div className="bg-gray-100 p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-blue-600 text-center">
                Add New Post
            </h2>

            {postLimitReached ? (
                <div className="text-center">
                    <p className="text-red-600 font-bold">Limit 5 reached</p>
                    <Link to="/membership" className="btn btn-warning mt-2">
                        Become a Member
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="font-semibold">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title required" })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="font-semibold">Slug</label>
                        <input
                            type="text"
                            {...register("slug", { required: "Slug required" })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="font-semibold">Short Description</label>
                        <textarea
                            rows={2}
                            {...register("shortDescription", {
                                required: "Short description required",
                            })}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>

                    {/* Full Content */}
                    <div>
                        <label className="font-semibold">Full Content</label>
                        <textarea
                            rows={8}
                            {...register("fullContent", { required: "Content required" })}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            {...register("category", { required: "Category required" })}
                            className="select select-bordered"
                        >
                            <option value="">Select Category</option>
                            <option>Technology</option>
                            <option>Sports</option>
                            <option>News</option>
                        </select>

                        <select {...register("subcategory")} className="select select-bordered">
                            <option value="">Select Subcategory</option>
                            <option>Gadgets</option>
                            <option>Politics</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="font-semibold">Tags</label>
                        <select
                            {...register("tag", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Tag</option>
                            {tags.map((tag) => (
                                <option key={tag._id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="font-semibold">Featured Image</label>
                        <input
                            type="file"
                            {...register("featuredImageFile", { required: true })}
                            className="file-input file-input-bordered w-full"
                        />

                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-300 rounded mt-2">
                                <div
                                    className="bg-blue-600 text-white text-center p-1 rounded"
                                    style={{ width: `${uploadProgress}%` }}
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}

                        {uploadedImageURL && (
                            <img src={uploadedImageURL} alt="Preview" className="w-40 mt-3 rounded" />
                        )}
                    </div>

                    {/* Poll */}
                    <div>
                        <input
                            type="checkbox"
                            checked={isPollEnabled}
                            onChange={(e) => setIsPollEnabled(e.target.checked)}
                            className="checkbox mr-2"
                        />
                        Enable Poll
                    </div>

                    {isPollEnabled && (
                        <div className="p-4 border rounded">
                            <input
                                type="text"
                                {...register("pollQuestion")}
                                placeholder="Poll Question"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                {...register("pollOption1")}
                                placeholder="Option 1"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                {...register("pollOption2")}
                                placeholder="Option 2"
                                className="input input-bordered w-full"
                            />
                        </div>
                    )}

                    {/* Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered"
                        >
                            <option>Draft</option>
                            <option>Published</option>
                            <option>Scheduled</option>
                        </select>

                        {status === "Scheduled" && (
                            <input
                                type="datetime-local"
                                {...register("scheduledDate", { required: true })}
                                className="input input-bordered w-full"
                            />
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Add Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddPost;
