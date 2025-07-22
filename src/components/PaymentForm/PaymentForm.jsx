import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PaymentForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [dbUser, setDbUser] = useState(null);


    const fetchUserFromDb = async () => {
        try {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            setDbUser(data);
        } catch (err) {
            console.error("Failed to fetch user from DB", err);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserFromDb();
        }
    }, [user]);

    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post('/create-payment-intent', { price })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(() => {
                    Swal.fire('Error', 'Failed to initiate payment', 'error');
                });
        }
    }, [price, axiosSecure]);

    const isMember = dbUser?.isMember === true && dbUser?.badge === 'gold';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        if (isMember) {
            Swal.fire('Info', 'You are already a Gold Member.', 'info');
            return;
        }

        const confirm = await Swal.fire({
            title: 'Confirm Payment',
            text: `Are you sure you want to pay $${price} for Gold Membership?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Pay now',
            cancelButtonText: 'Cancel',
        });

        if (!confirm.isConfirmed) {
            return;
        }

        setProcessing(true);
        setError('');
        setSuccess('');

        const card = elements.getElement(CardElement);
        if (!card) {
            setError('Card element not found');
            setProcessing(false);
            return;
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user?.displayName || 'Anonymous',
            },
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            Swal.fire('Error', confirmError.message, 'error');
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess('Payment successful! 🎉');

            try {
                await axiosSecure.patch(`/users/${user.email}/membership`, {
                    isMember: true,
                    badge: 'gold',
                    membershipPaidAt: new Date().toISOString(),
                    membershipAmount: price,
                });

                await fetchUserFromDb();

                Swal.fire('Success', 'Membership upgraded successfully!', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to update membership info', 'error');
                console.log(err)
            }
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
                <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: '16px' } } }} />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing || isMember}
                    className={`btn text-black w-full ${isMember ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isMember
                        ? 'You are already a Gold Member 🥇'
                        : processing
                            ? 'Processing...'
                            : `Pay $${price}`}
                </button>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    );
};

export default PaymentForm;
