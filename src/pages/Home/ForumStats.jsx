import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const stats = [
    { id: 1, label: "Total Posts", value: 1234, icon: "📝" },
    { id: 2, label: "Total Comments", value: 5678, icon: "💬" },
    { id: 3, label: "Registered Users", value: 890, icon: "👥" },
];

const AnimatedNumber = ({ value }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const increment = value / (duration / 30);
        const interval = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 30);
        return () => clearInterval(interval);
    }, [value]);

    return <span className="text-4xl font-extrabold">{count.toLocaleString()}</span>;
};

const ForumStats = () => {
    return (
        <section className="py-8 mb-8 bg-gray-50">
            <h2 className="text-2xl text-center mb-8 font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                DiscourseHub Stats
            </h2>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {stats.map(({ id, label, value, icon }) => (
                    <motion.div
                        key={id}
                        className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4"
                        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(59,130,246,0.4)" }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <div className="text-6xl">{icon}</div>
                        <AnimatedNumber value={value} />
                        <p className="text-lg font-semibold text-gray-700">{label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ForumStats;
