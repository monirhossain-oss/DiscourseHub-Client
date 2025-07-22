import { useState } from "react";
import AnnouncementSection from "./AnnouncementSection";
import Banner from "./Banner";
import SearchResults from "./SearchResults";
import TagsSection from "./TagsSection";
import PostList from "./PostList";

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');

    return (
        <div className="home-page">
            <Banner onSearch={setSearchedTag} />
            <SearchResults searchedTag={searchedTag} />
            <TagsSection></TagsSection>
            <AnnouncementSection></AnnouncementSection>
            <PostList></PostList>
        </div>
    );
};

export default Home;
