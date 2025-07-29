import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const TagsSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading tags...</p>;

    return (
        <div className=" mt-8 p-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-xl">
            {/* Section Title */}
            <h2 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-lg">
                Tags
            </h2>

            {/* Tags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tags.map(tag => (
                    <Link
                        key={tag._id}
                        to={`/tags/${encodeURIComponent(tag.name)}`}
                        className="bg-white bg-opacity-90 rounded-xl px-5 py-3 font-bold text-gray-900 text-lg hover:bg-purple-600 hover:text-white transition shadow-md flex justify-center items-center"
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagsSection;
