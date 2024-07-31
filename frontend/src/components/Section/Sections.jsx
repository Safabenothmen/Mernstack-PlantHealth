import React, { Fragment } from 'react';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Service from './Services/Service';
import Login from'./Login/Login';
import Signup from './Signup/Signup';
import { NavLink, Outlet} from "react-router-dom";
import { colors } from '@mui/material';


const sections = () => {
  return (
    <Fragment>
      <div id="content" style={{marginTop: "120px"}}>
        <Outlet/>      
      </div>
    </Fragment>
    
  );
};

export default sections;
