import React, { useState, useEffect } from 'react';
import Navber from '../../components/Navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../../components/Foote/Footer';
import Loader from '../../components/Loader/Loader';

const MainLayouts = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5 seconds loader
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <Navber />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;
