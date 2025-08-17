import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AnnouncementSection = () => {
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axios.get('https://server-nine-eta.vercel.app/announcements');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-8">Loading announcements...</div>;
    }

    return (
        announcements.length > 0 && (
            <div className="bg-white  my-8 px-4">
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
                            hour: '2-digit',
                            minute: '2-digit',
                        });

                        return (
                            <div
                                key={announcement._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 overflow-hidden"
                            >
                                {/* Image, Name & Time */}
                                <div className="flex items-center gap-3 p-4 bg-blue-50">
                                    <img
                                        src={announcement.photo}
                                        alt={announcement.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                                    />
                                    <div>
                                        <p className="font-semibold text-blue-700">{announcement.name}</p>
                                        <p className="text-sm text-gray-500">{formattedDate}</p>
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-wrap mb-4">
                                        {announcement.description}
                                    </p>
                                    <p className="text-xs text-gray-500 italic">
                                        📌 Posted by {formattedDate}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );
};

export default AnnouncementSection;
