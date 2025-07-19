import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';

const Banner = ({ onSearchResults }) => {
    const axiosInstance = useAxios();
    const [searchTag, setSearchTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTag.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/posts?tag=${encodeURIComponent(searchTag)}`);
            onSearchResults(response.data);
        } catch (err) {
            console.error(err);
            setError('Search failed. Try again.');
            onSearchResults([]); // clear results on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="banner p-6 bg-gray-100 rounded mb-6 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search posts by tag..."
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    className="flex-grow p-2 border rounded"
                />
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </section>
    );
};

export default Banner;
