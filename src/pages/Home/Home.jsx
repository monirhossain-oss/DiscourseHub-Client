import { useState } from "react";
import AnnouncementSection from "./AnnouncementSection";
import Banner from "./Banner";
import SearchResults from "./SearchResults";
import TagsSection from "./TagsSection";
import PostList from "./PostList";
import ForumStats from "./ForumStats";
import TrendingTopics from "./TrendingTopics";

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');

    return (
        <div className="home-page">
            <Banner onSearch={setSearchedTag} />
            <SearchResults searchedTag={searchedTag} />
            <TagsSection></TagsSection>
            <AnnouncementSection></AnnouncementSection>
            <PostList></PostList>
            <ForumStats></ForumStats>
            <TrendingTopics></TrendingTopics>
        </div>
    );
};

export default Home;
