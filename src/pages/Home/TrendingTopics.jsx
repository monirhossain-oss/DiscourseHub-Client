import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const trendingTopics = [
    'JavaScript',
    'React.js',
    'Node.js',
    'MongoDB',
    'CSS Tricks',
    'Web Performance',
    'Tailwind CSS',
    'TypeScript',
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.2, ease: 'easeOut' },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, rotate: -10 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
        scale: 1.2,
        rotate: 5,
        textShadow: "0px 0px 8px rgb(139, 92, 246)",
        boxShadow: "0px 5px 15px rgba(139, 92, 246, 0.6)",
        transition: { duration: 0.3 },
    },
    tap: {
        scale: 0.95,
        rotate: -5,
    },
};

const TrendingTopics = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <section
            ref={ref}
            className="p-8 my-16 bg-gradient-to-r from-indigo-50 via-purple-100 to-pink-50 rounded-3xl shadow-2xl"
        >
            <motion.h2
                initial={{ opacity: 0, y: -40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600"
            >
                Trending Topics
            </motion.h2>

            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
                {trendingTopics.map((topic, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="cursor-pointer rounded-xl bg-white shadow-lg p-6 font-semibold text-gray-800 select-none text-center"
                        style={{ userSelect: 'none' }}
                    >
                        {topic}
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
};

export default TrendingTopics;
