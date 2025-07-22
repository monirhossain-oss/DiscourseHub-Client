import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const MembershipPage = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isProcessing, setIsProcessing] = useState(false);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const res = await axiosSecure.post(`/membership/payment/${user.email}`);
            toast.success(res.data.message || "Membership upgraded!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to upgrade membership");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">Upgrade to Gold Membership 🥇</h2>
            <p className="text-center text-gray-700 mb-6">
                Unlock unlimited posting, premium badge, and exclusive forum features.
            </p>
            {user?.isMember ? (
                <p className="text-green-600 text-center font-semibold">You are already a Gold Member 🥇</p>
            ) : (
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full transition"
                >
                    {isProcessing ? "Processing..." : "Simulate Payment & Upgrade"}
                </button>
            )}
        </div>
    );
};

export default MembershipPage;
