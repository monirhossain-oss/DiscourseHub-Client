import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AddPost = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userInfo = {}, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: userPosts = [] } = useQuery({
        queryKey: ['userPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const postCount = userPosts.length;

    const { data: tags = [], isLoading: loadingTags } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const isLimitReached = !userInfo?.isMember && postCount >= 5;

    const onSubmit = async (data) => {
        const postData = {
            authorImage: user.photoURL,
            authorName: user.displayName,
            authorEmail: user.email,
            title: data.title,
            description: data.description,
            tags: [data.tag],
            createdAt: new Date().toISOString(),
            upVote: 0,
            downVote: 0,
            commentsCount: 0
        };

        try {
            await axiosSecure.post('/posts', postData);
            Swal.fire({
                icon: 'success',
                title: 'Post added successfully!',
                timer: 1500,
                showConfirmButton: false
            });
            reset();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add post',
                text: error.message
            });
        }
    };

    // Skeleton Loader
    if (loadingUserInfo || loadingTags) {
        return (
            <div className="bg-gray-100 p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    <Skeleton width={200} />
                </h2>
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="mb-4">
                        <Skeleton height={20} className="mb-2" />
                        <Skeleton height={40} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-6 rounded shadow">
            <h2 className="text-2xl text-blue-600 font-bold mb-4 text-center">Add New Post</h2>

            {isLimitReached ? (
                <div className="text-center">
                    <p className="text-red-600 font-semibold mb-4">
                        You have reached the limit of 5 posts.
                    </p>
                    <Link to='/membership' className="btn btn-warning">Become a Member</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Author Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Author Name</label>
                            <input
                                type="text"
                                value={user?.displayName}
                                readOnly
                                placeholder="Author Name"
                                className="input input-bordered w-full placeholder-black/70"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Author Email</label>
                            <input
                                type="text"
                                value={user?.email}
                                readOnly
                                placeholder="Author Email"
                                className="input input-bordered w-full placeholder-black/70"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            placeholder="Post Title"
                            className="input input-bordered w-full placeholder-black/70"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            placeholder="Post Description"
                            rows={4}
                            className="textarea textarea-bordered w-full placeholder-black/70"
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Tag */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Select Tag</label>
                        <select
                            {...register('tag', { required: 'Please select a tag' })}
                            className="select select-bordered w-full placeholder-black/70"
                        >
                            <option value="">Select a tag</option>
                            {tags.map(tag => (
                                <option key={tag._id} value={tag.name}>{tag.name}</option>
                            ))}
                        </select>
                        {errors.tag && <span className="text-red-500 text-sm">{errors.tag.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Add Post</button>
                </form>
            )}
        </div>
    );
};

export default AddPost;
