import React, { useState } from 'react';
import Sidebar from '../UI/SideBar/Sidebar'
import Body from './Body Section/Body'
import './dashbord.css'
import Navbar from '../UI/Navbar/Navbar'

const Dashbord = () => {


    return (
        <div className="container">
            <div className='sideBar grid'>
                <Sidebar/>
            </div>
            <div className='body'>
                <Body />
            </div>
        </div>
    );
}

export default Dashbord
