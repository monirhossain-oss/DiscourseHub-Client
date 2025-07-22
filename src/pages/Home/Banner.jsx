import React, { useState } from 'react';
import bannerImg from '../../assets/banner.jpg';

const Banner = ({ onSearch }) => {
    const [searchTag, setSearchTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTag.trim()) {
            onSearch(searchTag.trim());
        }
    };

    return (
        <div className="relative h-[300px] md:h-[500px] rounded-b-2xl flex items-center justify-center text-center text-white overflow-hidden">
           
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bannerImg})`,
                    opacity: 0.7,
                }}
            ></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                <h1
                    className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                    Welcome to DiscourseHub
                </h1>
                <p className="mb-6 text-gray-600 font-bold text-sm md:text-lg">Search posts by tags and explore discussions easily</p>
                <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-gray-300 opacity-75 rounded-4xl overflow-hidden shadow">
                    <input
                        type="text"
                        placeholder="Search by tag (e.g., react)"
                        value={searchTag}
                        onChange={(e) => setSearchTag(e.target.value)}
                        className="flex-grow px-4 py-2 text-gray-800 outline-none"
                    />
                    <button type="submit" className="bg-blue-500 cursor-pointer px-4 py-2 text-white hover:bg-blue-600">
                        Search
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Banner;