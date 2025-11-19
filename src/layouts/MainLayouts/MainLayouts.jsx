import React from 'react';
import Navber from '../../components/Navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../../components/Foote/Footer';

const MainLayouts = () => {
    return (
        <div className=''>
            <Navber></Navber>
            <div >
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;