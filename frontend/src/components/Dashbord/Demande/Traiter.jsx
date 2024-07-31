// import React, { useState, useEffect } from 'react';
// import './Traiter.css'
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';



// const ExpertList = () => {
//   const [experts, setExperts] = useState([]);
//   const [allexperts, setAllExperts] = useState([]);


//   useEffect(() => {
//     const getPendingExperts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/expert');
//         setExperts(response.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     getPendingExperts();
//   }, []);



//   useEffect(() => {
//     const getAllExperts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/Allexpert');
//         if (Array.isArray(response.data)) { // Vérifiez que response.data est un tableau
//           setAllExperts(response.data);
//         } else {
//           console.error("Erreur : response.data n'est pas un tableau");
//         }
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     getAllExperts();
//   }, []);
  


//   const handleReject = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/admin/refuser/${id}`, { status: 'Refusé' });
//       setExperts(experts.filter((expert) => expert._id !== id));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/admin/accepter/${id}`, { status: 'Accepté' });
//       setExperts(experts.filter((expert) => expert._id !== id));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };


//   const handleSupprimer = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/admin/supprimer/${id}`);
//       setAllExperts(response.data);

//       console.log(response.data);
//       alert('Expert supprimé avec succès!');
//     } catch (error) {
//       console.error(error);
//       alert('Erreur lors de la suppression de l\'expert.');
//     }
//   };

//   return (
//     <div>
//       <h2><strong>Demande d'inscription des experts</strong>  </h2>
//       <br/>
    
//     <TableContainer component={Paper}>
     

//       <Table sx={{ minWidth: 650 }} aria-label="simple table">

//         <TableHead>
//           <TableRow className='green-row'>
//             <TableCell>Email</TableCell>
//             <TableCell>Nom</TableCell>
//             <TableCell>Prénom</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {experts.map((expert) => (
//             <TableRow key={expert._id}>
//               <TableCell>{expert.email}</TableCell>
//               <TableCell>{expert.nom}</TableCell>
//               <TableCell>{expert.prenom}</TableCell>
          
//              <br/>
//               <TableCell>
             
//                 <Button  style={{marginRight: '10px'}} variant="contained" color="primary" onClick={() => handleApprove(expert._id)}>Accepter</Button>
//                  <Button style={{marginLeft: '10px'}} variant="contained" color="secondary" onClick={() => handleReject(expert._id)}>Refuser</Button>

               
              
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <br/>
//     <h2><strong>Les comptes des experts</strong> </h2>
//     <br/>
    
//     <TableContainer component={Paper}>
     

//       <Table sx={{ minWidth: 650 }} aria-label="simple table">

//         <TableHead>
//           <TableRow className='green-row'>
//             <TableCell>Email</TableCell>
//             <TableCell>Nom</TableCell>
//             <TableCell>Prénom</TableCell>
//            {/* <TableCell>Diplôme</TableCell>*/}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {allexperts.map((expert) => (
//             <TableRow key={expert._id}>
//               <TableCell>{expert.email}</TableCell>
//               <TableCell>{expert.nom}</TableCell>
//               <TableCell>{expert.prenom}</TableCell>
//              {/* <TableCell>{expert.diplome}</TableCell>*/}
//               <TableCell>
              
               
//                 <Button onClick={() => handleSupprimer(expert._id)} variant="contained" color="warning">
//                   Supprimer
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

//     </div>
//   );
// };

// export default ExpertList;


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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@material-ui/core';
import Stack from '@mui/material/Stack';

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [allexperts, setAllExperts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setfaliedMessage] = useState(false);


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

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/refuser/${id}`, { status: 'Refusé' });
      setExperts(experts.filter((expert) => expert._id !== id));
      setfaliedMessage(true);

    } catch (error) {
      console.error(error.message);
    }
  };
  const handleOpen = (expert) => {
    setSelectedExpert(expert);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/accepter/${id}`, { status: 'Accepté' });
      setExperts(experts.filter((expert) => expert._id !== id));
      setSuccessMessage(true);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };



  const handleViewExpert = (expert) => {
    setSelectedExpert(expert);
    setOpen(true);
  };

 

  return (
    <div>
      <br/>
      <br/>
      <h2 style={{ color: 'green'}}>
        <strong>Liste des demandes d'inscription des experts</strong>
      </h2>
      <br />
      <TableContainer component={Paper} style={{maxWidth: '800px', margin: '0 auto',alignContent:'left',marginLeft:'10px'}}>
  <Table sx={{ minWidth: 400 }} aria-label="simple table"fullWidth maxWidth="xs">
    <TableHead>
      <TableRow className="green-row">
        <TableCell style={{ color: 'green' }}><strong>Nom</strong></TableCell>
        <TableCell style={{ color: 'green' }}><strong>Prénom</strong></TableCell>
        <TableCell style={{ color: 'green' }}><strong>Accepter/Refuser</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {experts.map((expert) => (
        <TableRow key={expert._id}>
          <TableCell>{expert.nom}</TableCell>
          <TableCell>{expert.prenom}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleViewExpert(expert)}>
              <RemoveRedEyeOutlinedIcon/>
            </IconButton>
            {/* Ajoutez ici d'autres actions si nécessaire */}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Coordonnées de l'expert</DialogTitle>
        <DialogContent >
          {selectedExpert && (
            <>
             <DialogContentText>
                
                <strong>email : </strong> {selectedExpert.email}
              </DialogContentText>
              <DialogContentText>

                <strong>Nom : </strong> {selectedExpert.nom}
              </DialogContentText>
              <DialogContentText>
                <strong>Prénom : </strong> {selectedExpert.prenom}
              </DialogContentText>
              <DialogContentText>
                <strong>etablissement: </strong> {selectedExpert.etablissement}
                
              </DialogContentText>
              <DialogContentText>
            
                <strong>diplôme: </strong> {selectedExpert.diplome}
              </DialogContentText>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {/* <Snackbar open={handleApprove} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
</Snackbar> */}
        

              <button type="button" style={{ marginRight: '10px' }} class="btn btn-success btn-rounded" onClick={() => handleApprove(selectedExpert._id)}>Accepter
              <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(false)}>
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          Expert accepté avec succès!
        </Alert>
      </Snackbar></button>  
            <button type="button"style={{ marginRight: '10px' }}  onClick={() => handleReject(selectedExpert._id)} class="btn btn-danger btn-rounded">Refuser
            
            <Snackbar open={failedMessage} autoHideDuration={10000} onClose={() => setfaliedMessage(false)}>
        <Alert onClose={() =>  setfaliedMessage(false)} severity="error" sx={{ width: '100%' }}>
          Expert refusée !
        </Alert>
      </Snackbar>
            </button>

           
        </div>
              {/* Utilisez les coordonnées pour afficher la carte */}
              {/* <div style={{ height: '400px', width: '100%' }}>
                <Stack sx={{ width: '100%', height: '100%' }} spacing={1}>
                  <Alert severity="info">
                    Cliquez sur la carte pour afficher la position de l'expert
                  </Alert>
                  {/* Insérez ici le composant de la carte (par exemple, Google Maps) 
                </Stack>
              </div> */}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpertList;
