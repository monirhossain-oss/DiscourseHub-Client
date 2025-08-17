import React from 'react';
import useAuth from '../../hooks/useAuth';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { Link } from 'react-router';

const MembershipPage = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className=" mb-8 p-6 bg-gray-100 rounded-b-xl shadow">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">Become a Gold Member 🥇</h2>

            <p className="mb-2 text-center text-gray-700">
                Welcome <span className="font-semibold text-yellow-800">{user?.displayName || "Guest"}</span>!
            </p>

            <p className="mb-6 text-center text-gray-700">
                Unlock premium features and post unlimited content.
            </p>

            {user?.isMember ? (
                <div className="text-center">
                    <p className="text-green-600 font-semibold mb-4">You are already a Gold Member 🥇</p>
                    <Link
                        to="/"
                        className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                        Go to Home
                    </Link>
                </div>
            ) : (
                <div>
                    <p className="mb-4 text-sm text-gray-600 text-center">
                        Pay securely below to upgrade your account:
                    </p>
                    <PaymentForm price={70} />
                </div>
            )}
        </div>
    );
};

export default MembershipPage;
