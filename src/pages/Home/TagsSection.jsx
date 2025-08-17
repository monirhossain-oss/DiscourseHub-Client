import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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

    if (isLoading) {
        return (
            <div className="px-6 py-12">
                {/* Section Title Skeleton */}
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-10 text-center text-blue-600 tracking-wide">
                    <Skeleton width={120} height={28} style={{ margin: '0 auto' }} />
                </h2>

                {/* Tags Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg shadow-md px-4 py-2 flex justify-center items-center"
                        >
                            <Skeleton width={80} height={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
