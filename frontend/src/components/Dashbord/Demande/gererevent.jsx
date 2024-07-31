import React, { useEffect, useState } from 'react';
import './gererevent.css'
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Button, Card, CardContent, makeStyles, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  forumContainer: {
    maxWidth: 1050,
    margin: '0 auto',
    padding: 20,
    justifyContent: 'flex-start',
  },
  alignLeft: {
    textAlign: 'left',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textShadow: '2px 2px 4px rgba(1, 40, 8, 0.49)',
    marginBottom: 20,
    textAlign: 'left',
  },
  postCard: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    justifyContent: 'flex-start',
  },
  postHeader: {
    backgroundColor: theme.palette.success.light,
    color: '#fff',
    padding: '10px 16px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  postHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#78b097',
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
  },
  postDate: {
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
    marginLeft: 'center',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'white',
    margin: '10px 0',
    textAlign: 'left',
    wordBreak: 'break-word',
  },
  createPostButton: {
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#a5aaad',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 'auto',
    borderRadius: 4,
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'bold',
    },
  },
  deleteIcon: {
    fontWeight: 'white',
    color: 'black',
    cursor: 'pointer',
    marginLeft:230,
  },
  editIcon: {
    marginRight: 10,
    color: 'bold',
    cursor: 'pointer',
  },
  expertIndicator: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'blue',
    padding: '4px 8px',
    borderRadius: 4,
    marginBottom: 10,
  },
}));
function GererEvent() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allevent');
        const data = response.data;
        setEvents(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements', error);
      }
    };

    fetchEvents();
  }, []);
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteevent/${eventId}`);
      // Mettre à jour la liste des événements après la suppression
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement', error);
    }
  };

  
  return (
    <div>
      <br/>
    <h1>Liste des événements</h1>
    <div className="container">
    
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
             <DeleteIcon className={classes.deleteIcon} onClick={() => handleDeleteEvent(event._id)}/>
            <h2 className="event-title">{event.titre}</h2>
            <p className="event-description">{event.description}</p>
            <p className="event-date">Date : {event.date}</p>
            <div className="event-details">
              <p className="event-person">Publié par : {event.nom} {event.prenom}</p>
              <br/>
            
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default GererEvent;
