import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, useAnimation } from 'framer-motion';

const AnnouncementSection = () => {
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axios.get('https://server-nine-eta.vercel.app/announcements');
            return res.data;
        }
    });

    const controls = useAnimation();

    useEffect(() => {
        if (!isLoading) {
            controls.start('visible');
        }
    }, [isLoading, controls]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        hover: {
            scale: 1.05,
            rotateX: 3,
            rotateY: 3,
            boxShadow: '0px 20px 30px rgba(0,0,0,0.2)',
            transition: { duration: 0.3, ease: 'easeInOut' }
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white my-8 px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
                    📢 Latest Announcements
                </h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[...Array(6)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-center gap-3 p-4 bg-blue-50">
                                <Skeleton circle width={48} height={48} />
                                <div className="flex-1">
                                    <Skeleton width={120} height={16} />
                                    <Skeleton width={80} height={12} className="mt-1" />
                                </div>
                            </div>
                            <div className="p-4">
                                <Skeleton width={`80%`} height={20} />
                                <Skeleton count={3} className="mt-2" />
                                <Skeleton width={`60%`} height={12} className="mt-3" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    }

    return (
        announcements.length > 0 && (
            <div className="bg-white my-8 px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
                    📢 Latest Announcements
                </h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
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
                            <motion.div
                                key={announcement._id}
                                className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden cursor-pointer"
                                variants={cardVariants}
                                whileHover="hover"
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
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        )
    );
};

export default AnnouncementSection;
