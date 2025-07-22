import React from 'react';
import useAuth from '../../hooks/useAuth';
import PaymentForm from '../../components/PaymentForm/PaymentForm';

const MembershipPage = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">Become a Gold Member 🥇</h2>
            <p className="mb-6 text-center text-gray-700">
                Unlock premium features and post unlimited content.
            </p>

            {user?.isMember ? (
                <p className="text-green-600 font-semibold text-center">You are already a Gold Member 🥇</p>
            ) : (
                <PaymentForm price={70} />
            )}
        </div>
    );
};

export default MembershipPage;
