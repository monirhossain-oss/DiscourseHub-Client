import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import { Link } from "react-router";

const Banner = ({ onSearch }) => {
    const [searchTag, setSearchTag] = useState("");

    const slides = [
        {
            img: banner1,
            title: "Join Our Community",
            desc: "Connect with thousands of tech enthusiasts and start sharing your ideas today.",
        },
        {
            img: banner2,
            title: "Learn from Experts",
            desc: "Access tutorials, guides, and professional advice to enhance your skills.",
        },
        {
            img: banner3,
            title: "Collaborate on Projects",
            desc: "Work together with peers and professionals to build real-world projects.",
        },
        {
            img: banner4,
            title: "Stay Updated with Trends",
            desc: "Get notified about the latest discussions, technologies, and news in the industry.",
        },
        {
            img: banner5,
            title: "Expand Your Network",
            desc: "Meet industry leaders, join events, and grow your professional network.",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTag.trim()) onSearch(searchTag.trim());
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        pauseOnHover: true,
        arrows: true,
    };

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] overflow-hidden shadow-lg">
            <Slider {...settings} className="h-full">
                {slides.map((slide, idx) => (
                    <div key={idx} className="relative w-full h-[300px] md:h-[400px] lg:h-[400px]">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        ></div>

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#d98fbd] drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-sm md:text-lg mb-6 text-[#4ea3b8] font-semibold drop-shadow-md max-w-2xl">
                                {slide.desc}
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center mb-6">
                                <Link
                                    to="/join"
                                    className="px-6 py-2 bg-[#9a031e] hover:bg-[#fb8b24] text-white font-semibold rounded-full transition duration-300 text-center"
                                >
                                    Join Now
                                </Link>
                                <Link
                                    to="/explore"
                                    className="px-6 py-2 bg-[#e36414] hover:bg-[#fb8b24] text-white font-semibold rounded-full transition duration-300 text-center"
                                >
                                    Explore
                                </Link>
                            </div>

                            {/* Search Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="flex w-full max-w-md bg-[#5f0f40]/70 rounded-4xl overflow-hidden shadow"
                            >
                                <input
                                    type="text"
                                    placeholder="Search by tag (e.g., react)"
                                    value={searchTag}
                                    onChange={(e) => setSearchTag(e.target.value)}
                                    className="flex-grow px-4 py-2 bg-[#0f4c5c]/50 text-white placeholder-white outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#9a031e] px-4 py-2 text-white hover:bg-[#fb8b24] transition duration-300"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
