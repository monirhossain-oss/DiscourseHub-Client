import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-t-[#5f0f40] border-b-[#e36414] border-gray-200 rounded-full animate-spin"></div>

            {/* Branding Text */}
            <h2 className="mt-4 text-xl font-bold text-[#5f0f40]">DiscourseHub</h2>
            <p className="text-sm text-[#0f4c5c] mt-1">Loading content, please wait...</p>
        </div>
    );
};

export default Loader;