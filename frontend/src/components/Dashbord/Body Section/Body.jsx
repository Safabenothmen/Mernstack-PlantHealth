import "./body.css";
import hello from "../../../Assets/hello.svg";
//import Chart from "../charts/Chart";
import Top from "./Top Section/Top"
import { Outlet } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';



const Body = ({  }) => {

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Récupérez les informations de l'utilisateur connecté depuis le backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
        setUser(`${response.data.nom} ${response.data.prenom}`);

        // Extrayez le nom de l'utilisateur à partir de la réponse du backend
       

        // Mettez à jour l'état du nom de l'utilisateur
       
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <main >
      {userData && userData.role == 'expert' && (
        <h2>Bienvenue {user}</h2>
      )}
       {userData && userData.role == 'agriculteur' && (
        <h2>Bienvenue {user}</h2>
      )}
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
      
        <div className="main__title">
       
          <div className="main__greeting">
         
             {/* <p>Welcome to your admin dashboard</p> */}
           
          </div>
        </div>
        <Top/>
        <Outlet/>
        
        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
       
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Body;
