import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, makeStyles, Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@material-ui/core/Button';


import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  // ...Styles here
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
    color: 'white',
    cursor: 'pointer',
    marginLeft: 20,
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
  participantsDialog: {
    width: '90%',
    maxWidth: 800,
    margin: '0 auto',
  },
  
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: red[500],

  },
}));

const Mesevent = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  

  useEffect(() => {
    // Fetch events on component mount
    handleAllEvents();
  }, []);

  const handleAllEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:5000/myevent', config);
      console.log('mes evenements:', response.data);
      setEvents(response.data); // Update events state with fetched data
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  };

  const fetchParticipants = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`http://localhost:5000/${eventId}/participants`, config);
      console.log('Participants:', response.data);
      setParticipants(response.data.participants); // Update participants state with fetched data
      setShowParticipantsDialog(true); // Show the participants dialog
    } catch (error) {
      console.error('Erreur lors de la récupération des participants:', error);
    }
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/event/${eventId}`, config);
      handleAllEvents(); // Fetch events again to update the list
      console.log('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const acceptParticipant = async (eventId, participantId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`http://localhost:5000/event/${eventId}/accept/${participantId}`, {}, config);
      console.log('Participant accepted:', response.data);
      // Update your local state or perform other necessary actions
    } catch (error) {
      console.error("Erreur lors de l'acceptation du participant:", error);
    }
  };
  
  
  const handleEventClick = (eventId) => {
    fetchParticipants(eventId);
  };

  const closeParticipantsDialog = () => {
    setShowParticipantsDialog(false);
    setParticipants([]); // Clear participants data
  };

  return (
    <div className={`${classes.forumContainer} ${classes.alignLeft} `}>
      <br />
      <Typography variant="h1" className={classes.title}>
        Mes événements
      </Typography>
      <br />
      <br />
      {events.map((event) => (
        <Card key={event._id} className={classes.postCard}>
          <Card className={classes.card}>
            <div className={classes.postHeaderContent}>
              <Typography variant="body1" className={classes.postAuthor} onClick={() => handleEventClick(event._id)}>
           {event.nom} {event.prenom}
              </Typography>
              <Typography variant="body1" className={classes.postDate}>
           
                {event.date}
              </Typography>
              <IconButton className={classes.deleteIcon} onClick={() => handleDeleteEvent(event._id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
          <CardContent>
            <Typography variant="body1">   <strong>{event.titre}</strong> <br/>{event.description}</Typography>
            {/* Display other event details here */}
          </CardContent>
        </Card>
      ))}
      {/* Participants Dialog */}
      <Dialog open={showParticipantsDialog} onClose={closeParticipantsDialog} className={classes.participantsDialog} fullWidth>

        <DialogTitle>Liste des participants</DialogTitle>
        <IconButton className={classes.closeButton} onClick={closeParticipantsDialog}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {participants.map((participant,event) => (
              <TableRow key={participant._id}>
                
                <TableCell>{participant.nom}</TableCell>
                <TableCell>{participant.prenom}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>
                  
                    <Button variant="contained" color="primary" onClick={() => acceptParticipant(event._id, participant._id)}>
                      Accepter
                    </Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mesevent;
