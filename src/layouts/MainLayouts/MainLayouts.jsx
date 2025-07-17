import React from 'react';
import Navber from '../../components/Navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../../components/Foote/Footer';

const MainLayouts = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;