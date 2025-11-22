import React, { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return alert("Please enter your email");
        // Future: API call here
        alert(`Subscribed successfully with ${email}`);
        setEmail("");
    };

    return (
        <section className="py-8 px-4 bg-[#e36414]/10">
            <div className="max-w-3xl mx-auto text-center text-[#5f0f40]">
                <h2 className="text-4xl font-extrabold mb-4">Stay Updated!</h2>
                <p className="text-lg mb-8">
                    Subscribe to our newsletter and never miss any updates or new discussions.
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-5 py-3 border-2 border-[#5f0f40] rounded-lg text-gray-900 w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-[#9a031e]"
                        required
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-white text-[#5f0f40] font-bold rounded-lg hover:bg-[#fb8b24] hover:text-white transition-all duration-300"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="mt-4 text-sm text-white/70">
                    We respect your privacy. No spam ever.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
