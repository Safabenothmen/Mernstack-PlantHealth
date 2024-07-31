import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Sidebar from '../../UI/SideBar/Sidebar';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


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
    backgroundColor:'WhiteSmoke',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginTop: theme.spacing(-10), 
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
    backgroundColor:'White',

  },
  photoButton: {
    marginBottom: theme.spacing(2),
    backgroundColor:'White'
  },
  filename: {
    marginLeft: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
backgroundColor:'green'  },
}));

const Post = () => {
  const classes = useStyles();

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();

  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
        setUser(response.data.nom);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('description', description);
      formData.append('photo', photo);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/pub', formData, config);

      console.log('Nouvelle publication créée:', response.data);
      setTitre('');
      setDescription('');
      setPhoto(null);
      alert('Nouvelle publication créée')
      navigate('/dashboard/Forum')
    } catch (error) {
      console.error('Erreur lors de la création de la publication:', error);
    }
  };

  const handleTitreChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className={classes.root}>
  
      <Card className={classes.card}>
      <CardHeader title={user} className={classes.cardHeader} />
        <CardContent className={classes.cardContent}>
          <TextField
            type="text"
            placeholder="Titre"
            // value={titre}
            onChange={handleTitreChange}
            className={classes.textField}
            fullWidth
            // variant="outlined"
          />
          <TextField
            multiline
            rows={4}
            placeholder="Description"
            // value={description}
            onChange={handleDescriptionChange}
            className={classes.textField}
            fullWidth
            // variant="outlined"
          />
          <input
            accept="image/*"
            onChange={handlePhotoChange}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          {/* <label htmlFor="icon-button-file">
            <IconButton color="secondary" className={classes.photoButton} component="span">
              <PhotoCamera />
            </IconButton>
          </label> */}
          <Typography variant="body2" className={classes.filename}>
            {photo ? photo.name : ''}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="green"
            variant="contained"
            disabled={!titre}
            onClick={handleSubmit}
            class="btn btn-primary"
            className={classes.submitButton}
          >
            Publier
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
