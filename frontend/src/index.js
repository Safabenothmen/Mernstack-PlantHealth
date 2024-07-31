import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
//import './style.css';
import 'bootstrap/dist/js/bootstrap.js';
//import App from './App';


//import "./css/icon-font.css" 

//import "./css/fancybox.min.css" 

//import "./css/swiper.min.css" 

//import "./css/bootstrap.min.css" 

//import "./css/odometer.min.css" 

//import "./css/swiper.min.css" 

//import "./css/flaticon.css" 


import reportWebVitals from './reportWebVitals';
import router from './router.jsx';
import { RouterProvider } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
