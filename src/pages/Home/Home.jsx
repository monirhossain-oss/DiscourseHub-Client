import { useState } from "react";
import AnnouncementSection from "./AnnouncementSection";
import Banner from "./Banner";
import SearchResults from "./SearchResults";
import TagsSection from "./TagsSection";

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');

    return (
        <div className="home-page">
            <Banner onSearch={setSearchedTag} />
            <SearchResults searchedTag={searchedTag} />
            <AnnouncementSection></AnnouncementSection>
            <TagsSection></TagsSection>
        </div>
    );
};

export default Home;
