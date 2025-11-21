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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImageURL, setUploadedImageURL] = useState("");

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
    const titleWatch = watch("title", "");

    useEffect(() => {
        setValue("slug", slugify(titleWatch));
    }, [titleWatch, setValue]);

    const { data: tags = [], isLoading: loadingTags } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    const { data: userInfo = {}, isLoading: loadingUser } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: userPosts = [] } = useQuery({
        queryKey: ["userPosts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const postLimitReached = !userInfo?.isMember && userPosts.length >= 5;

    const onSubmit = async (data) => {
        if (postLimitReached) {
            Swal.fire({
                icon: "warning",
                title: "Post limit reached",
            });
            return;
        }

        if (!data.featuredImageFile || data.featuredImageFile.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Please select an image",
            });
            return;
        }

        try {
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

            const postData = {
                authorImage: user.photoURL,
                authorName: user.displayName,
                authorEmail: user.email,
                title: data.title,
                shortDescription: data.shortDescription,
                fullContent: data.fullContent,
                category: data.category,
                tags: data.tag ? [data.tag] : [],
                featuredImage: photoURL,
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
            <div className="bg-[#e36414]/10 p-6 rounded">
                <Skeleton height={30} />
                <Skeleton height={40} count={6} />
            </div>
        );

    return (
        <div className="bg-[#fb8b24]/10 p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-[#5f0f40] text-center mb-4">
                Add New Post
            </h2>

            {postLimitReached ? (
                <div className="text-center">
                    <p className="text-[#9a031e] font-bold">Post limit reached (5)</p>
                    <Link
                        to="/membership"
                        className="px-4 py-2 mt-2 inline-block bg-[#5f0f40] text-white rounded hover:bg-[#fb8b24] transition"
                    >
                        Become a Member
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title required" })}
                            className="input input-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]"
                        />
                        {errors.title && <p className="text-[#9a031e]">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Short Description</label>
                        <textarea
                            rows={1}
                            {...register("shortDescription", { required: "Short description required" })}
                            className="textarea textarea-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]"
                        ></textarea>
                        {errors.shortDescription && (
                            <p className="text-[#9a031e]">{errors.shortDescription.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Full Content</label>
                        <textarea
                            rows={3}
                            {...register("fullContent", { required: "Content required" })}
                            className="textarea textarea-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]"
                        ></textarea>
                        {errors.fullContent && <p className="text-[#9a031e]">{errors.fullContent.message}</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Category</label>
                        <select
                            {...register("category", { required: "Category required" })}
                            className="select select-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]"
                        >
                            <option value="">Select Category</option>
                            <option>React</option>
                            <option>Node.js</option>
                            <option>Design</option>
                            <option>Database</option>
                            <option>Mobile</option>
                            <option>Debugging</option>
                            <option>HTML5</option>
                            <option>CSS3</option>
                        </select>
                        {errors.category && <p className="text-[#9a031e]">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Tags</label>
                        <select {...register("tag")} className="select select-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]">
                            <option value="">Select Tag</option>
                            {tags.map((tag) => (
                                <option key={tag._id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold text-[#0f4c5c]">Featured Image</label>
                        <input
                            type="file"
                            {...register("featuredImageFile", { required: true })}
                            className="file-input file-input-bordered w-full border-[#5f0f40] focus:border-[#fb8b24]"
                        />
                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-300 rounded mt-2">
                                <div
                                    className="bg-[#5f0f40] text-white text-center p-1 rounded"
                                    style={{ width: `${uploadProgress}%` }}
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}
                        {uploadedImageURL && (
                            <img
                                src={uploadedImageURL}
                                alt="Preview"
                                className="w-40 mt-3 rounded border border-[#5f0f40]"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#5f0f40] text-white font-bold rounded hover:bg-[#fb8b24] transition"
                    >
                        Add Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddPost;
