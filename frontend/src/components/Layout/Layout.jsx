import React, { Fragment } from 'react';

//import Header from '../UI/Header/Header';
//import Section from '../Section/Sections';
//import Footer from '../UI/Footer/Footer';
import Navbar from '../UI/Navbar/Navbar';

import Footer from '../UI/Footer/Footer';
import Link from '../UI/Link/Link';
import Sections from '../Section/Sections';



export default function Layout() {
  return (
    <Fragment>
   <Navbar/>
    <Sections/>
    <Footer/>

      
    </Fragment>
  );
};


/*
<main>
        <Section />
      </main>
      <Footer />

      */