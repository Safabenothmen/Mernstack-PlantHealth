import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const Participant= () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants(id);
  }, [id]);

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
      setParticipants(response.data.participants);
    } catch (error) {
      console.error('Erreur lors de la récupération des participants:', error);
    }
  };

  return (
    <div>
      <Typography variant="h1">Participants</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant._id}>
              <TableCell>{participant.nom}</TableCell>
              <TableCell>{participant.prenom}</TableCell>
              <TableCell>{participant.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Participant;
