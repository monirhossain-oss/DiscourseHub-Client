import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
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

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => {
                    console.error(err);
                    toast.error("Failed to initiate payment");
                });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

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
                name: user?.name || 'Anonymous',
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
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setSuccess('Payment successful! 🎉');

            // Update user membership in backend
            try {
                await axiosSecure.patch(`/users/${user.email}/membership`, {
                    isMember: true,
                    badge: 'gold',
                    membershipPaidAt: new Date().toISOString(),
                    membershipAmount: price,
                });
                toast.success('Membership upgraded successfully!');
            } catch {
                toast.error('Failed to update membership info');
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
                    disabled={!stripe || !clientSecret || processing}
                    className="btn btn-primary w-full"
                >
                    {processing ? 'Processing...' : `Pay $${price}`}
                </button>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    );
};

export default PaymentForm;
