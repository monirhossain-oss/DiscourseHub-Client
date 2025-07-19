import React, { useState } from 'react';
import Banner from './Banner';
import SearchResults from './SearchResults';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="home-page">
             <Banner onSearchResults={setSearchResults} />
            {searchResults.length > 0 && <SearchResults posts={searchResults} />}
        </div>
    );
};

export default Home;
