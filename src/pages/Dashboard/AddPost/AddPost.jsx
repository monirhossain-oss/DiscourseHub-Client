import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

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
    console.log(postCount)

   
    const { data: tags = [], isLoading: loadingTags } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    
    const isLimitReached = !userInfo?.isMember && postCount >= 5;
    // console.log(isLimitReached)

   
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

    
    if (loadingUserInfo || loadingTags) {
        return <p className="text-center py-8">Loading...</p>;
    }

    return (
        <div className="p-4">
            <div className="bg-gray-300 p-6 rounded shadow max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Post</h2>

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
                                <label className="block text-sm mb-1">Author Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Author Email</label>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm mb-1">Title</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                placeholder="Post Title"
                                className="input input-bordered w-full"
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm mb-1">Description</label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                placeholder="Post Description"
                                rows={4}
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                        </div>

                        {/* Tag */}
                        <div>
                            <label className="block text-sm mb-1">Select Tag</label>
                            <select
                                {...register('tag', { required: 'Please select a tag' })}
                                className="select select-bordered w-full"
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
        </div>
    );
};

export default AddPost;
