import React, { useState } from "react";
import './Agri.css'
import video from '../../../Assets/vd2.mp4'
import {Link,useNavigate} from 'react-router-dom'
import Topbar from '../../UI/TopBar/Topbar'
import logo from '../../../Assets/logo3.png'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
 import {AiOutlineSwapRight} from 'react-icons/ai'
 import {MdEmail} from 'react-icons/md'
 import axios from "axios";

const Agriculteur = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setprenom] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(email, nom, prenom, password);
    try {
      const response = await axios.post("http://localhost:5000/register/agri", {
        email,
        nom,
        prenom,
        password,
      });
      const data = response.data;
      console.log(data, "userRegister");
      if (data) {
        alert("Registration Successful");
        navigate('/login');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error);
    }
  };
  

  return (
    
   <div>
    <Topbar/>
    <div className='agripage flex'>
      <div className="container flex">
        <div className="videodiv">
        <video src={video} autoPlay muted loop></video>
        <div className='textDiv'>
          <h2 className='title'> Bienvenue au VAGROK Farm</h2>
           <p>Adopt the peace of nature!</p>    
        </div>
        <div className='footerDiv flex'>
          <span className='text'> have an aacount?</span>
          <Link to={'/login'}>
          <button className='btn'>login</button>
          </Link>
        </div>
        
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>Bienvenue!</h3>
          </div>
          <form action="onSubmit" className='form grid' onSubmit={handleSubmit} >
          <div className="inputDiv">
          <label htmlFor="nom">Nom</label>
          <div className=" input flex"> 
          <FaUserShield className='icon'/>
          <input type="text" id="nom" value={nom} placeholder='Entrer votre nom'    
           onChange={(e) => setNom(e.target.value)} required/>
          </div>
          <div className="inputDiv">
          <label htmlFor="prenom">Prénom</label>
          <div className=" input flex"> 
          <FaUserShield className='icon'/>
          <input type="text" id="prenom" value={prenom} placeholder='Entrer votre prénom'
          onChange={(e) => setprenom(e.target.value)}/>
          </div>
          </div>

  </div>
    
          <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <div className=" input flex"> 
          <MdEmail className='icon'/>
          <input type="email" id="email" value={email} placeholder='Entrer votre email'onChange={(e) => setEmail(e.target.value)}/>
          </div>
          </div>



          <div className="inputDiv">
          <label htmlFor="Mot de passe">Mot de passe</label>
          <div className=" input flex"> 
          <BsFillShieldLockFill className='icon'/>
          <input type="password" id="password" value={password} placeholder='Entrer votre mot de passe'  onChange={(e) => setPassword(e.target.value)}/>
          </div>
          </div>
         
          <button type="submit" className='btn flex'>
            <span> Register</span>
            <AiOutlineSwapRight className='icon'/>
          </button>
          
          <span className='forgotpassword'>Forgot your password ? <a href="">click here</a></span>
</form>        
        
    
     </div>
    </div>
    </div>
    </div>
   
  )
}

export default Agriculteur


