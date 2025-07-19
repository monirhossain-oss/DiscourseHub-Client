import React from 'react';

const SearchResults = ({ posts }) => {
    if (!posts.length) {
        return <p className="text-center mt-4 text-gray-600">No posts found.</p>;
    }

    return (
        <section className="search-results max-w-4xl mx-auto">
            {posts.map(post => (
                <div key={post._id} className="post-card p-4 mb-4 border rounded shadow">
                    <div className="flex items-center gap-3 mb-2">
                        <img src={post.authorImage} alt={post.authorName} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold">{post.authorName}</p>
                            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="mt-2">{post.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags?.map(tag => (
                            <span key={tag} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default SearchResults;
