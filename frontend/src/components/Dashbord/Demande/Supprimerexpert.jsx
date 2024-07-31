import React, { useState, useEffect } from 'react';
import './Traiter.css'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import MapIcon from '@mui/icons-material/Map';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Supprimerexpert = () => {
    const [experts, setExperts] = useState([]);
    const [allexperts, setAllExperts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState(null);
  
    useEffect(() => {
      const getPendingExperts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin/expert');
          setExperts(response.data);
        } catch (error) {
          console.error(error.message);
        }
      };
      getPendingExperts();
    }, []);
  
    useEffect(() => {
      const getAllExperts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin/Allexpert');
          if (Array.isArray(response.data)) {
            setAllExperts(response.data);
            
          } else {
            console.error("Erreur : response.data n'est pas un tableau");
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      getAllExperts();
    }, []);
  
  
  

  
    const handleSupprimer = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/supprimer/${id}`);
        // setAllExperts(response.data);
        alert('Expert supprimé avec succès!');
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la suppression de l'expert.");
      }
    };
  
    const handleViewExpert = (expert) => {
      setSelectedExpert(expert);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div>
         <h2>
        <strong>Les comptes des experts</strong>
      </h2>
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="green-row">
              <TableCell>Email</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allexperts.map((expert) => (
              <TableRow key={expert._id}>
                <TableCell>{expert.email}</TableCell>
                <TableCell>{expert.nom}</TableCell>
                <TableCell>{expert.prenom}</TableCell>
                <TableCell>
                  <Button onClick={() => handleSupprimer(expert._id)} variant="contained" color="warning">
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Supprimerexpert