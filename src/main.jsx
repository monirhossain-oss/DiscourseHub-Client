import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/Router.jsx';
import AuthProvider from './context/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { SkeletonTheme } from 'react-loading-skeleton';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SkeletonTheme  baseColor="#202020" highlightColor="#444"> */}
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>
        </QueryClientProvider>
      </AuthProvider>
    {/* </SkeletonTheme> */}
  </StrictMode>,
);
