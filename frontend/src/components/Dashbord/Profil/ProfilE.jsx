import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import avatar1 from"../../../Assets/avatar1.jpeg";
import avatar2 from "../../../Assets/avatar2.png";
import { useParams } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';

import ava from "../../../Assets/ava.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "50px",
  },
  card1: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "800px",
    minHeight: "550px",
    padding: theme.spacing(4),
    backgroundColor: "rgba(120, 176, 151, 0.08)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    marginRight: theme.spacing(3),
  },
  card2: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "300px",
    minHeight: "550px",
    padding: theme.spacing(4),
    backgroundColor: "rgba(120, 176, 131, 0.35)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  choixava:{
    marginTop:"-50px",
  },
  ava:{
    width: theme.spacing(6), // Ajustez la taille des avatars ici
    height: theme.spacing(6),
    marginBottom: theme.spacing(3),
    marginRight:'10px',
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    marginTop:"-45px",
  

  },
  avatar: {
    width: theme.spacing(12), // Ajustez la taille des avatars ici
    height: theme.spacing(12),
    marginRight: theme.spacing(2),
    border: `4px solid ${theme.palette.common.white}`,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    marginTop:'-15px'
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
}));

const ProfileUpdate = () => {
  
  const [user, setUser] = useState('');
  const [useremail, setUseremail] = useState('');
  const [usernom, setUsernom] = useState('');
  const [userpass, setUserpass] = useState('');
  const [userprenom, setUserprenom] = useState('');
  const [userdiplome,setuserdiplome]=useState('');
  const [useretablissement,setuserEtablissement]=useState('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  useEffect(() => {

    // Récupérez les informations de l'utilisateur connecté depuis le backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      
        setUserId(response.data.id);
        setUsernom(response.data.nom);
        setUserprenom(response.data.prenom);
        setUseremail(response.data.email);
        setUserpass(response.data.password);
        setuserdiplome(response.data.diplome)
        setuserEtablissement(response.data.etablissement)
       setUser(`${response.data.nom} ${response.data.prenom} `);
        console.log(response.data)

        // Extrayez le nom de l'utilisateur à partir de la réponse du backend
       

        // Mettez à jour l'état du nom de l'utilisateur
       
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  const classes = useStyles();
 
  //  const [nom, setNom] = useState("");
  //  const [prenom, setPrenom] = useState("");
  //  const [password, setPassword] = useState("");
  //  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(ava);

  
  const handleAvatarSelection = (avatarURL) => {
    setSelectedAvatar(avatarURL);
  };
  const handleNameChange = (e) => {
    setNom(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setPrenom(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlediplomeChange = (e) => {
    setDiplome(e.target.value);
  };
  const handleEtabChange = (e) => {
    setEtablissement(e.target.value);
  };
  
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const[diplome,setDiplome]=useState('');
    const[etablissement,setEtablissement]=useState('');
  
    useEffect(() => {
      setNom(usernom)
      setPrenom(userprenom)
      setEmail(useremail)
      setPassword(userpass)
      setDiplome(userdiplome)
      setEtablissement(useretablissement)
    },[usernom,userprenom,useremail,userpass,userdiplome,useretablissement])
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await axios.put(`http://localhost:5000/updateExpert/${userId}`, { nom,prenom,password, email,diplome,etablissement},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }})
        console.log('Profil utilisateur mis à jour avec succès !');
      } catch (error) {
        console.error(error);
      }
    }
  
  return (
    <div className={classes.container}>
      <Card className={classes.card1}>
        {/* Contenu de la première carte */}
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">Modifier le profil</Typography>

          <form>
            <TextField
              label="Nom"
              value={nom}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prénom"
              type="text"
              value={prenom}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
            />
          </form>

          <Button type="submit" variant="contained" className={classes.button} onClick={handleSubmit}>
           Modifier
          </Button>
        </CardContent>
      </Card>
      <Card className={classes.card2}>
        {/* Contenu de la deuxième carte */}
        <Typography   variant="subtitle1" style={{color:"bold"}}>Choisir un avatar:</Typography>
        <CardContent className={classes.cardContent}>
        
          <div className={classes.avatarContainer}>
            <Avatar
              alt="Avatar 1"
              src={avatar1}
              className={classes.ava}
              onClick={() => handleAvatarSelection(avatar1)}
            />
            <Avatar
              alt="Avatar 2"
              src={avatar2}
              className={classes.ava}
              onClick={() => handleAvatarSelection(avatar2)}
            />
          </div>
          <Avatar
            alt="Avatar"
            src={selectedAvatar}
            className={classes.avatar}
          />
          <Typography variant="h5">{user}</Typography>
          
          <TextField
              label="diplome"
              type="text"
              value={diplome}
              onChange={handlediplomeChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="etablissement"
              type="text"
              value={etablissement}
              onChange={handleEtabChange}
              fullWidth
              margin="normal"
            />
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;