import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import './index.css'
import Agriculteur from './components/Section/Signup/Agriculteur'
import Expert from './components/Section/Signup/Expert'


import Contact from './components/Section/Contact/Contact'
import Login from './components/Section/Login/Login'
import Home from './components/Section/Home/Home'
import Service from './components/Section/Services/Service'
import GuestLayout from './components/Layout/GuestLayout'
import Post from'./components/Dashbord/Forum/post'
import Postdetails from './components/Dashbord/Forum/Postdetails'
//import { Children } from 'react'
import Layout from './components/Layout/Layout'
import About from './components/Section/About/About'
import Signup from './components/Section/Signup/Signup'
//import Dashbord from './components/Dashbord/Dashbord'
import Forum from './components/Dashbord/Forum/Forum'
import Maladie from './components/Dashbord/Maladie/Maladi'
import Actualite from './components/Dashbord/Actualite/Actualite'
import Actualiteagri from './components/Dashbord/ActualiteAgri/Actulaiteagri'
import Actualiteadmin from './components/Dashbord/ActualiteAdmin/Actualiteadmin'
import Actualiteexpert from './components/Dashbord/ActualiteExpert/Actualiteexpert'
import Expertise from './components/Dashbord/Expertise/Exerptise'
import Evenement from './components/Dashbord/Evenement/Evenement'
import Traiter from './components/Dashbord/Demande/Traiter'
import Gererevent from './components/Dashbord/Demande/gererevent'
import Dashbord from './components/Dashbord/Dashbord'
import Gererpub from './components/Dashbord/Demande/Gererpub'
import Mesevent from './components/Dashbord/Evenement/Mesevent'
import Participant from './components/Dashbord/Evenement/Participant'
import Profil from './components/Dashbord/Profil/Profil'
import Supprimerexpert from './components/Dashbord/Demande/Supprimerexpert'
import ProfilE from './components/Dashbord/Profil/ProfilE'
import Mespub from './components/Dashbord/Forum/Mespub'
//import router from './router.jsx'


const router = createBrowserRouter([

{
    path:'/',
    element: <Layout/>,
    children: [

        {
            path:'home',
            element: <Home/>
            
        },
        {
            path:'/',
            element: <Home/>
            
        },
        {
            path:'Contact',
            element: <Contact/>
            
        },
        
        {
            path:'Services',
            element: <Service/>
            
        },
        {
            path:'About',
            element: <About/>
            
        },
        
            
    ]   
},
{
    path:'login',
    element: <Login/>
   
},
{
path:'signup',
element: <Signup/>

},


{
    path:'Agriculteur',
    element: <Agriculteur/>
   
},

{
    path:'Expert',
    element: <Expert/>
   
},
{
    path:'dashboard',
    element: <Dashbord/>,
    children: [
        {
           path: 'Actualiteagri',
            element: <Actualiteagri/>
           
        },
        {
            path: 'Actualiteadmin',
            element: <Actualiteadmin/>
           
        },
        {
            path: 'Actualiteexpert',
            element: <Actualiteexpert/>
           
        },
        {
            path:'Forum',
            element: <Forum/>,
            
           
        },
        {
            path:'Post',
            element:<Post/>

        },
        {
            path: 'Post/:id', 
            element: <Postdetails />,
          },
          {
            path: 'Mespub', 
            element: <Mespub/>,
          },

        {
            path:'Maladie',
            element: <Maladie/>
           
        },
        {
            path:'Expertise',
            element: <Expertise/>
           
        },
        
        {
            path:'Evenement',
            element: <Evenement/>
           
        },
        {
            path:'mesevent',
            element:<Mesevent/>
        },
        {
            path:'Participant',
            element:<Participant/>
        },
        {
            path:'Traiter',
            element:<Traiter/>
        },
        {
            path:'Gererevent',
            element:<Gererevent/>
        },
        {
            path:'Gererpub',
            element:<Gererpub/>
        },
        {
            path:'Supprimerexpert',
            element:<Supprimerexpert/>
    
    },
    {
        path:'Profil',
        element:<Profil/>
    },
    {
        path:'ProfilE',
        element:<ProfilE/>
    }


    ]
    
   
},




])

export default router;