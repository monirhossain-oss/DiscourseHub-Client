import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AnnouncementSection = () => {

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/announcements');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-8">Loading announcements...</div>;
    }

    return (
        announcements.length > 0 && (
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
                    📢 Latest Announcements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => {
                        const date = new Date(announcement.createdAt);
                        const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return (
                            <div
                                key={announcement._id}
                                className="bg-white/70 backdrop-blur shadow-md rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                                    {announcement.title}
                                </h3>
                                <p className="text-gray-600 whitespace-pre-wrap mb-4">
                                    {announcement.description}
                                </p>
                                <p className="text-sm text-gray-500 italic">
                                    📅 Posted on {formattedDate}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );

};

export default AnnouncementSection;
