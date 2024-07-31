import React from 'react'
import './signup.css'
import video from '../../../Assets/vd2.mp4'
import {Link} from 'react-router-dom'
import Topbar from '../../UI/TopBar/Topbar'
import logo from '../../../Assets/logo3.png'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
 import {AiOutlineSwapRight} from 'react-icons/ai'
 import {MdEmail} from 'react-icons/md'
import { Button } from '@mui/material'
import Agri from'./Agriculteur'
import Expert from './Expert'
const Signup = () => {
  return (
    
   <div>
    <Topbar/>
    <div className='registerpage flex'>
      <div className="container flex">
        
      
        
        
    

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>Êtes-vous un agriculteur ou un expert  !</h3>
          </div>
          <form action="" className='form grid'>
          <div className="inputDiv">
          <Link to={'/Agriculteur'}>
          <button className='btn'>je suis agriculteur</button>
          </Link>
          </div>


          <div className="inputDiv">
          <Link to={'/Expert'}>
          <button className='btn'>je suis expert</button>
          </Link>
          
          
          </div>

          </form>        
        
    
     </div>
     
    </div>
    </div>
  
    </div>
   
  )
}

export default Signup