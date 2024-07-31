import React, { useState } from "react";
import './login.css'
import video from '../../../Assets/vd2.mp4'
import {Link, useNavigate } from 'react-router-dom'
import Topbar from '../../UI/TopBar/Topbar'
import logo from '../../../Assets/logo3.png'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';



const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const[status,setStatus]=useState('');
  


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const handleSubmit = async (e) => {
  e.preventDefault();
 

  try {
    const response = await axios.post('http://localhost:5000/login', { email, password,role});
    console.log(response.data);
   //const  role  = data.userData.role;
   const userRole = response.data.userData.role;
   const token = response.data.token;


      // Enregistrez le token d'authentification dans le stockage local (localStorage)
      localStorage.setItem('token', token);
console.log(userRole);

    if (response.data)
     {    console.log("authentification reussite");
     
      
     
  
        if (userRole === 'agriculteur') {
          navigate('/dashboard/Profil');
        } else if (userRole === 'expert') {
         
         {
             navigate('/dashboard/ProfilE');
          }
      
        } else if (userRole === 'administrateur') {
          navigate('/dashboard/Actualiteadmin');
        } else {
          console.log(`Unknown role: ${userRole}`);
        }
      
      
      
      
      
      
      
    } else {
      console.log('No data in response');
    }
  } catch (error) {
    alert(error.response.data.message);
    console.log(error.response.data.message);
  }
};


  





  return (
    
    <div>
      <Topbar/>
      <ToastContainer />
        
    <div className='loginpage flex'>
      <div className="container flex">
        <div className="videodiv">
        <video src={video} autoPlay muted loop></video>
        <div className='textDiv'>
          <h2 className='title'> Bienvenue au VAGROk FARMER</h2>
           <p>La nature nourrit nos vies, l'agriculture cultive notre avenir </p>    
        </div>
        <div className='footerDiv flex'>
          <span className='text'>Vous n'avez pas de compte ?</span>
          <Link to={'/signup'}>
          <button className='btn'>S'inscrire</button>
          </Link>
        </div>
        
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>SE CONNECTER</h3>
          </div>
  

          <form action="" className='form grid' onSubmit={handleSubmit}>
            {/*<span className='showMessage'>Login Status will go here</span>*/}
            <div className="connecter">
          <div className="inputDiv">
          {/* <label htmlFor="Email">Email</label> */}
          <div className=" input flex"> 
          <FaUserShield className='icon'/>
          

          <input type="email" value={email}  onChange={handleEmailChange} required/>


          </div>
          </div>


          <div className="inputDiv">
          {/* <label htmlFor="Mot de passe">Mot de passe</label> */}
          <div className=" input flex"> 
          <BsFillShieldLockFill className='icon'/>
          <input type="password" value={password} onChange={handlePasswordChange} required />

          </div>
          </div>

     
        <button type="submit" className="btn flex">
          <span>Se connecter
          </span>
          <AiOutlineSwapRight className="icon" />
        </button>
        </div>
          
         
          <span className='forgotpassword'>Mot de passe oublié? <a href=""  className="lien">cliquez ici</a></span>
</form>        
        

     </div>
    </div>
    </div>
      
    </div>
     
  )
 
}


export default Login