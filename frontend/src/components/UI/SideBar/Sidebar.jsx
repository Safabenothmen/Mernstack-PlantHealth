import "./sidebar.css";
import { useState,useEffect } from "react";
import axios  from "axios";
import logo from "../../../Assets/logo1.png";
import { Link , Navigate, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faSearch, faCalendar,  faEnvelope } from '@fortawesome/free-solid-svg-icons'
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';    
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, Outlet} from "react-router-dom";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddDisabledOutlinedIcon from '@mui/icons-material/PersonAddDisabledOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate} from 'react-router-dom';



const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    const location = useLocation();
    const Navigtae=useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const response = await axios.get('http://localhost:5000/me', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const { role } = response.data;
          setRole(role);
          console.log(role);
        } catch (error) {
          console.error('Error retrieving user role:', error);
        }
      };
    
      fetchUserRole();
    }, []);
    
    
     
    
      const handleLogout = async () => {
        
          // Effectuer une requête POST à l'API pour se déconnecter
         
          // Rediriger vers la page de connexion ou autre page appropriée
          Navigate('/login');
        
        }
      
      

  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
       
         
       VAGROK FARM

       </div> 

        {/* <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i> */}
     
      <hr className="green-line" />


      <div className="sidebar__menu">

      {role === 'agriculteur' && (
          <>


<div className={`sidebar__link ${location.pathname === '/dashboard/Actualiteagri' ? 'active_menu_link' : ''}`}>
<HomeIcon style={{ color: '#3ea175' }}/>
        <Link to="/dashboard/Actualiteagri" >Acceuil  </Link>
      </div>
      <div className={`sidebar__link ${location.pathname === '/dashboard/Profil' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
              <AccountCircleIcon style={{ color: '#3ea175' }}/>
              </div>
              <Link to="/dashboard/Profil">Profil</Link>
            </div>
            <div className={`sidebar__link ${location.pathname === '/dashboard/Forum' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
                <FontAwesomeIcon icon={faComment} color="#3ea175" />
              </div>
              <Link to="/dashboard/Forum">Forum</Link>
            </div>



            {/* <div className={`sidebar__link ${location.pathname === '/dashboard/Mespub' ? 'active_menu_link' : ''}`}>Mes publications
              </div> */}

      

            <div className={`sidebar__link ${location.pathname === '/dashboard/Maladie' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
                <FontAwesomeIcon icon={faSearch} color="#3ea175" />
              </div>
              <Link to="/dashboard/Maladie">Détecter la maladie </Link>
            </div>
            <div className={`sidebar__link ${location.pathname === '/dashboard/Expertise' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
                <EventNoteIcon icon={faEnvelope} color="#3ea175" />
              </div>
              <Link to="/dashboard/Expertise">Evénement</Link>
            </div>  
            {/* <div className={`sidebar__link ${location.pathname === '/dashboard/Expertise' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
              <EventNoteIcon style={{ color: '#3ea175' }}/>
  
  <FontAwesomeIcon icon="fa-sharp fa-light fa-calendar-pen" />
              </div>
              <Link to="/dashboard/Expertise">Evènement</Link>
            </div> */}
            
          </>
        )}




{role === 'expert' && (
          <>


<div className={`sidebar__link ${location.pathname === '/dashboard/Actualiteexpert' ? 'active_menu_link' : ''}`}>
<div className="sidebar__icon">
      <HomeIcon style={{ color: '#3ea175' }}/>
          </div>  
        <Link to="/dashboard/Actualiteexpert" > Acceuil Expert </Link>
      </div>

              {/* Profil */}
           <div className={`sidebar__link ${location.pathname === '/dashboard/ProfilE' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
              <AccountCircleIcon style={{ color: '#3ea175' }}/>
              </div>
              <Link to="/dashboard/ProfilE">Profil</Link>
            </div>
            {/* Forum */}
<div>
            <div className={`sidebar__link ${location.pathname === '/dashboard/Forum' ? 'active_menu_link' : ''}`}>
              <div className="sidebar__icon">
                <FontAwesomeIcon icon={faComment} color="#3ea175" />
              </div>
              <Link to="/dashboard/Forum">Forum</Link>
            </div>
            <div className={`sidebar__link ${location.pathname === '/dashboard/Post/:id' ? 'active_menu_link' : ''}`}>
            </div>
    

            <div className={`sidebar__link ${location.pathname === '/dashboard/Post' ? 'active_menu_link' : ''}`}>
     
      </div>
            <div className={`sidebar__link ${location.pathname === '/dashboard/Evenement' ? 'active_menu_link' : ''}`}>
      <div className="sidebar__icon">
      <EventNoteIcon style={{ color: '#3ea175' }}/>
  
      <FontAwesomeIcon icon="fa-sharp fa-light fa-calendar-pen" />
        </div>        

        <Link to="/dashboard/Evenement" >Evènements  </Link>
      </div>

      <div className={`sidebar__link ${location.pathname === '/dashboard/Mesevent' ? 'active_menu_link' : ''}`}>
      </div>
      <div className={`sidebar__link ${location.pathname === '/dashboard/Participant/:id' ? 'active_menu_link' : ''}`}>
    
      </div>
      </div>
          </>
        )}





{role === 'administrateur' && (
          <>

<div className={`sidebar__link ${location.pathname === '/dashboard/Actualiteadmin' ? 'active_menu_link' : ''}`}>
        {/* <i className="fa fa-home"></i> */}
        <div className="sidebar__icon">
      <HomeTwoToneIcon  style={{ color: '#3ea175' }}/>
          </div>  
        
        <Link to="/dashboard/Actualiteadmin" > Acceuil Admin  </Link>
      </div>

      <div className={`sidebar__link ${location.pathname === '/dashboard/Traiter' ? 'active_menu_link' : ''}`}>
      <div className="sidebar__icon">
      <GroupAddOutlinedIcon style={{ color: '#3ea175' }}/>
        </div>        
        <Link to="/dashboard/Traiter" >Demandes d'experts</Link>
      </div>
      <div className={`sidebar__link ${location.pathname === '/dashboard/Supprimerexpert' ? 'active_menu_link' : ''}`}>
      <div className="sidebar__icon">
        {/* <FontAwesomeIcon icon={faCalendar} color="#3ea175" /> */}
        
        <PersonAddDisabledOutlinedIcon  style={{ color: '#3ea175' }} />

        </div>        
        <Link to="/dashboard/Supprimerexpert" >Supprimer expert</Link>
      </div>
      <div className={`sidebar__link ${location.pathname === '/dashboard/Gererevent' ? 'active_menu_link' : ''}`}>
      <div className="sidebar__icon">
      <EventNoteTwoToneIcon  style={{ color: '#3ea175' }}/>
          </div>        
        <Link to="/dashboard/Gererevent" >Gérer évenement </Link>
      </div>
      
      <div className={`sidebar__link ${location.pathname === '/dashboard/Gererpub' ? 'active_menu_link' : ''}`}>
      <div className="sidebar__icon">
        {/* <FontAwesomeIcon icon={faCalendar} color="#3ea175" /> */}
        
        <MessageTwoToneIcon  style={{ color: '#3ea175' }} />

        </div>        
        <Link to="/dashboard/Gererpub" >Gérer publication </Link>
      </div>
        
  
          </>
        )}
     
      

     
{/*       
      <h2>Services</h2>

      
      


     
      



     

      
      <div className="sidebar__link">
        <i className="fa fa-handshake-o"></i>
        <a href="#">Contracts</a>
      </div>
   
    
    <h2>Paramètre</h2>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="#">Profile</a>
        </div> */}
        {/*
        <div className="sidebar__link">
          <i className="fa fa-files-o"></i>
          <a href="#">Apply for leave</a>
        </div>
        <h2>PAYROLL</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase"></i>
          <a href="#">Paygrade</a>
  </div> */}
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="/" onClick={handleLogout}>Log out</a>
        </div>
      </div>

      </div>  
    
  );
};

export default Sidebar;




{/* import React from 'react'
import {IoMdSpeedometer} from 'react-icons/io' 
import {MdDeliveryDining} from 'react-icons/md'
import {MdOutlineExplore } from 'react-icons/md'
import {BsTrophy} from 'react-icons/bs'
import{AiOutlinePieChart} from 'react-icons/ai'
import{BiTrendingUp} from 'react-icons/bi'
import {MdOutlinePermContactCalendar} from 'react-icons/md'
import logo from '../../../Assets/logo1.png'
import { Link } from 'react-router-dom';


import {BsCreditCard2Front} from 'react-icons/bs'
import {BsQuestionCircle} from 'react-icons/bs'
import './sidebar.css'
const Sidebar = ({ handleItemClick }) => {
  return (
    
      <div>
      <div className='logoDiv flex'>
      <img src={logo} alt="logo"/>

          <h2>Planti.</h2>
      </div>
        <div className='menuDiv'>
      <h3 className='divTitle'>
          QUICK MENU </h3>
          <ul className='menuLists grid'>
              <li className="listItem">

              <Link to="/Forum" className='menuLink flex' onClick={() => handleItemClick("Forum")}>
                  <IoMdSpeedometer className="icon"/>
                  <span className='smallText'>
                  Forum 
                  </span>
                  </Link>
              </li>

              <li className="listItem">
              <Link to="/Maladie" className='menuLink flex'>
                  <MdDeliveryDining className="icon"/>
                  <span className='smallText'>
                     Maladie
                  </span>
              </Link>
              </li>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <MdOutlineExplore className="icon"/>
                  <span className='smallText'>
                      Explore
                  </span>
              </a>
              </li>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <BsTrophy className="icon"/>
                  <span className='smallText'>
                      Products
                      </span>
              </a>
              </li>
          </ul>
  </div>
  
  <div className='settingsDiv'>
      <h3 className='divTitle'>
          SETTINGS </h3>
          <ul className='menuLists grid'>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <AiOutlinePieChart className="icon"/>
                  <span className='smallText'>
                      Charts
                      </span>
              </a>
              </li>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <BiTrendingUp className="icon"/>
                  <span className='smallText'>
                     Trends
                  </span>
              </a>
              </li>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <MdOutlinePermContactCalendar className="icon"/>
                  <span className='smallText'>
                      Contact
                  </span>
              </a>
              </li>
              <li className="listItem">
              <a href="www.google.com" className='menuLink flex'>
                  <BsCreditCard2Front className="icon"/>
                  <span className='smallText'>
                      Billing        
                   </span>
              </a>
              </li>
          </ul>
  </div>
  <div className='sideBarCard'>
      <BsQuestionCircle className="icon"/>
      <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"> </div>
              <h3> Help Center</h3>
              <p>Having trouble in Planti, please contact us from for more questions</p>
  <button className='btn'>Go to help center</button>
          
  
  
      </div>
  </div>
  
  
         </div >
       
    )
}

export default Sidebar

*/}