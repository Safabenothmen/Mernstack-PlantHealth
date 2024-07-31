import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  card: {
    width: '80%',
    maxWidth: 900,
    backgroundColor: 'WhiteSmoke',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginTop: theme.spacing(-29),
  },
  cardHeader: {
    paddingBottom: theme.spacing(2),
  },
  cardContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'White',
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: 'green',
  },
  button: {
    marginTop: theme.spacing(10),
    backgroundColor: 'green',
    marginLeft:'2px',
    justifyContent:'left'
  
  }
}));

const Evenement = () => {
  const classes = useStyles();
  const navigate=useNavigate();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);

  useEffect(() => {
    // Code pour récupérer les informations de l'utilisateur
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        titre,
        description,
        date,
      };

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    

      const response = await axios.post('http://localhost:5000/create/event', eventData, config);

      console.log('Nouvel événement créé:', response.data);
      setTitre('');
      setDescription('');
      setDate(null);
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
    }
  };
  // const handleAllEvents = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  
  //     const response = await axios.get('http://localhost:5000/myevent', config);
  //     console.log('mes evenements:', response.data);
  //     // Update your state or perform any necessary actions with the events data
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des événements:', error);
  //   }
  // };
  const handleAllEvents = (postId) => {
    navigate(`/dashboard/mesevent`);
  };

  const handleParticipant = (postId) => {
    navigate(`/dashboard/Participant`);
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

 

  const handleParticipantRequests = () => {
    // Code pour afficher les demandes des participants
  };

  return (
    <div>
      <br/>
      <br/>
    <Button
    color="green"
    variant="contained"
  
  onClick={() => handleAllEvents()}
    className={classes.button}
  >
   Mes événements
  </Button>
  <Button
    color="green"
    variant="contained"
    onClick={()=>handleParticipant()}
    className={classes.button}
  >
    participants
  </Button>
    <div className={classes.root}>
         
      <Card className={classes.card}>
        <CardHeader title="Créer un nouvel événement" className={classes.cardHeader} />
        <CardContent className={classes.cardContent}>
          <TextField
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={handleTitreChange}
            className={classes.textField}
            fullWidth
          />
          <TextField
            multiline
            rows={4}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className={classes.textField}
            fullWidth
          />
          <TextField
            type="date"
            placeholder="Date"
            value={date}
            onChange={handleDateChange}
            className={classes.textField}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={!titre || !description || !date}
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            Créer
          </Button>
     
        </CardActions>
      </Card>
    </div>
    </div>
  );
};

export default Evenement;
