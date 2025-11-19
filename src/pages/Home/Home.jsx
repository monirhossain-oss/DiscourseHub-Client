import { useState } from "react";
import { motion } from "framer-motion";

import AnnouncementSection from "./AnnouncementSection";
import Banner from "./Banner";
import SearchResults from "./SearchResults";
import TagsSection from "./TagsSection";
import PostList from "./PostList";
import TrendingTopics from "./PopularCatagories";
import Features from "./Featuers";
import PopularCategories from "./PopularCatagories";
import TrendingDiscussions from "./TrendingDiscussions ";
import HowItWorks from "./HowItWorks";
import CommunityStats from "./CommunityStats";
import Testimonials from "./Testimonials";
import SecurityModeration from "./securityFeatures";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');

    return (
        <div className="home-page">
            {/* Banner Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <Banner onSearch={setSearchedTag} />
            </motion.div>

            {/* Search Results */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <SearchResults searchedTag={searchedTag} />
            </motion.div>

            {/* Features */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <Features />
            </motion.div>

            {/* Popular Categories */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <PopularCategories />
            </motion.div>

            {/* Trending Discussions */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <TrendingDiscussions />
            </motion.div>

            {/* How It Works */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <HowItWorks />
            </motion.div>

            {/* Community Stats */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <CommunityStats />
            </motion.div>

            {/* Testimonials */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <Testimonials />
            </motion.div>

            {/* Security & Moderation */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <SecurityModeration />
            </motion.div>

            {/* Tags Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <TagsSection />
            </motion.div>

            {/* Announcements */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <AnnouncementSection />
            </motion.div>

            {/* Post List */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <PostList />
            </motion.div>
        </div>
    );
};

export default Home;
