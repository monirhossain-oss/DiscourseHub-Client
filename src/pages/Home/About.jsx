import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Newsletter from "./Newsletter";
import { useParams } from "react-router";

const About = () => {
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [id])
    return (
        <div className="bg-white">

            {/* HERO SECTION */}
            <section className="bg-[#5f0f40] text-white py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        About DiscourseHub
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg md:text-xl max-w-[800px] mx-auto"
                    >
                        A modern developer community built to share knowledge, grow together,
                        and create meaningful discussions that matter.
                    </motion.p>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="py-16 px-4 bg-[#e36414]/10">
                <div className="max-w-[1000px] mx-auto">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-[#5f0f40] mb-6 text-center"
                    >
                        Our Story
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="text-gray-700 text-lg leading-relaxed text-center max-w-[850px] mx-auto"
                    >
                        DiscourseHub was created to bring developers from all around the world
                        together in one space — where learning is open, discussions are
                        meaningful, and everyone has a voice.
                        <br />
                        <br />
                        Our mission is simple: Build a forum that feels modern, fast, and
                        developer-friendly. We believe knowledge grows when shared.
                    </motion.p>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-20 px-4">
                <div className="max-w-[1200px] mx-auto">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-[#9a031e] mb-12 text-center"
                    >
                        What Makes Us Different?
                    </motion.h2>

                    <div className="space-y-16">

                        {/* Item 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col md:flex-row items-center md:items-start gap-8"
                        >
                            <div className="text-5xl text-[#e36414]">💡</div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#5f0f40] mb-2">
                                    Built for Developers
                                </h3>
                                <p className="text-gray-700 text-lg max-w-[800px]">
                                    Every feature is crafted to make knowledge-sharing easier.
                                    Ask questions, post insights, share tips — all in one place.
                                </p>
                            </div>
                        </motion.div>

                        {/* Item 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col md:flex-row md:flex-row-reverse items-center md:items-start gap-8"
                        >
                            <div className="text-5xl text-[#9a031e]">🚀</div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#9a031e] mb-2">
                                    Fast, Clean, Modern
                                </h3>
                                <p className="text-gray-700 text-lg max-w-[800px]">
                                    React + Tailwind + modern API makes the platform super fast,
                                    smooth, and enjoyable to browse.
                                </p>
                            </div>
                        </motion.div>

                        {/* Item 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col md:flex-row items-center md:items-start gap-8"
                        >
                            <div className="text-5xl text-[#0f4c5c]">🔐</div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#0f4c5c] mb-2">
                                    Secure & Community Driven
                                </h3>
                                <p className="text-gray-700 text-lg max-w-[800px]">
                                    Verified accounts, moderated posts, safe interaction —
                                    a respectful and protected space for everyone.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* VISION QUOTE */}
            <section className="bg-[#0f4c5c] text-white py-20 px-4">
                <div className="max-w-[900px] mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-2xl md:text-3xl leading-relaxed font-light"
                    >
                        “Our vision is to build the biggest developer discussion platform
                        where everyone can learn, contribute, and grow together.”
                    </motion.p>
                </div>
            </section>

            {/* FOOTER */}
            <section className=" text-center text-gray-600 text-sm">
                <Newsletter></Newsletter>
            </section>

        </div>
    );
};

export default About;
