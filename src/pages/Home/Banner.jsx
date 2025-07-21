import React, { useState } from 'react';

const Banner = ({ onSearch }) => {
    const [searchTag, setSearchTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTag.trim()) {
            onSearch(searchTag.trim());
        }
    };

    return (
        <div className="relative h-[400px] rounded-b-2xl bg-cover bg-center flex items-center justify-center text-center text-white"
            style={{ backgroundImage: `url('/banner-bg.jpg')` }}
        >
            <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to DiscourseHub</h1>
                <p className="mb-6 text-sm md:text-lg">Search posts by tags and explore discussions easily</p>
                <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-white rounded overflow-hidden shadow">
                    <input type="text" placeholder="Search by tag (e.g., react)" value={searchTag} onChange={(e) => setSearchTag(e.target.value)} className="flex-grow px-4 py-2 text-gray-800 outline-none" />
                    <button type="submit" className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Banner;