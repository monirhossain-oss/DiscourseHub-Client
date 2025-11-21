import React from "react";
import Slider from "react-slick";
import { FaComments, FaArrowUp } from "react-icons/fa";

// Dummy discussions
const discussions = [
    { id: 1, title: "How to optimize React performance?", excerpt: "I'm facing performance issues in my React app.", category: "React", upvotes: 34, comments: 12, time: "2 hours ago" },
    { id: 2, title: "Best practices for Node.js", excerpt: "How to handle errors in Node.js?", category: "Node.js", upvotes: 27, comments: 8, time: "5 hours ago" },
    { id: 3, title: "CSS Grid vs Flexbox", excerpt: "When to use Grid vs Flexbox?", category: "CSS", upvotes: 19, comments: 4, time: "1 day ago" },
    { id: 4, title: "MongoDB aggregation examples", excerpt: "Explain MongoDB aggregation framework.", category: "MongoDB", upvotes: 15, comments: 6, time: "3 days ago" },
    { id: 5, title: "Tailwind CSS utilities tips", excerpt: "Tips for responsive design.", category: "CSS", upvotes: 22, comments: 9, time: "6 hours ago" },
];

const TrendingDiscussions = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // default desktop
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024, // tablet
                settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true }
            },
            {
                breakpoint: 640, // mobile
                settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
            },
        ],
        appendDots: dots => <div className="mt-4"><ul className="flex justify-center gap-2">{dots}</ul></div>,
        customPaging: () => <div className="w-3 h-3 rounded-full bg-[#5f0f40]"></div>,
    };

    return (
        <section className="py-8 px-2 sm:px-4 md:px-8 bg-[#e36414]/10">
            <div className="max-w-[1280px] mx-auto text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5f0f40]">Trending Discussions</h2>
            </div>

            <Slider {...settings}>
                {discussions.map(d => (
                    <div key={d.id} className="px-2">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-semibold text-[#9a031e] bg-[#fb8b24]/20 px-2 py-1 rounded">{d.category}</span>
                                    <span className="text-xs text-[#0f4c5c]">{d.time}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#5f0f40] mb-2 hover:text-[#9a031e] cursor-pointer">{d.title}</h3>
                                <p className="text-[#0f4c5c] text-sm mb-4">{d.excerpt}</p>
                            </div>
                            <div className="flex gap-4 text-[#5f0f40] text-sm mt-auto">
                                <div className="flex items-center gap-1">
                                    <FaArrowUp />
                                    <span>{d.upvotes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaComments />
                                    <span>{d.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default TrendingDiscussions;
