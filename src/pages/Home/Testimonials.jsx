import React from "react";
import Slider from "react-slick";
import useAuth from "../../hooks/useAuth";

const Testimonials = () => {
    const { users } = useAuth();

    const testimonials = [
        {
            img: "https://randomuser.me/api/portraits/women/65.jpg",
            name: "Alice Johnson",
            role: "Frontend Developer",
            quote: "DiscourseHub has transformed how I collaborate with others. Highly recommended!",
            id: 1,
        },
        {
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Mark Thompson",
            role: "Student",
            quote: "I learned so much from the community discussions. Amazing platform!",
            id: 2,
        },
        {
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Sophie Lee",
            role: "UI/UX Designer",
            quote: "The platform is intuitive and engaging. Love getting answers quickly!",
            id: 3,
        },
        {
            img: "https://randomuser.me/api/portraits/men/12.jpg",
            name: "John Doe",
            role: "Backend Developer",
            quote: "A great community to learn and share knowledge with peers.",
            id: 4,
        },
        {
            img: "https://randomuser.me/api/portraits/women/22.jpg",
            name: "Emma Watson",
            role: "Student",
            quote: "I got quick answers to my questions, very helpful!",
            id: 5,
        },
    ];


    const settings = {
        dots: true,
        infinite: testimonials.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
        appendDots: (dots) => (
            <div className="mt-8">
                <ul className="flex justify-center gap-2">{dots}</ul>
            </div>
        ),
        customPaging: () => <div className="w-3 h-3 rounded-full bg-[#5f0f40]"></div>,
    };

    return (
        <section className="py-8 px-4 bg-[#fb8b24]/10">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5f0f40] mb-10">
                    What Our Users Say
                </h2>

                <Slider {...settings}>
                    {testimonials.map((t) => (
                        <div key={t.id} className="px-3">
                            <div className="bg-white p-6 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition duration-300 h-full ">
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#9a031e] mb-4 object-cover"
                                />
                                <h3 className="text-lg md:text-xl font-bold text-[#5f0f40] mb-1">{t.name}</h3>
                                <p className="text-sm md:text-base text-[#e36414] mb-3">{t.role}</p>
                                <p className="text-[#0f4c5c] text-sm md:text-base">{t.quote}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
