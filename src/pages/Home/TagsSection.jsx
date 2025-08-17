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
        <div className="px-6 py-12 ">

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-10 text-center text-blue-600 tracking-wide">
                Tags
            </h2>

            {/* Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map(tag => (
                    <Link
                        key={tag._id}
                        to={`/tags/${encodeURIComponent(tag.name)}`}
                        className="bg-gray-200 rounded-lg px-4 py-2 font-medium text-gray-700 text-sm 
                       hover:bg-gray-300  transition-all duration-200 
                       shadow-md flex justify-center items-center"
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagsSection;
