import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DropzoneArea } from 'material-ui-dropzone';
import Paper from '@material-ui/core/Paper';
import Clear from '@material-ui/icons/Clear';
import axios from 'axios';

// import cblogo from './cblogo.PNG';
// import image from './bg.png';
import { common } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

//const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: '-webkit-fill-available',
    borderRadius: '15px',
    padding: '15px 22px',
    color: '#000000a6',
    fontSize: '20px',
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  gridContainer: {
    justifyContent: 'center',
    padding: '4em 1em 0 1em',
  },
  mainContainer: {
    // backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // backgroundSize: 'cover',
    height: '400vh',
    marginTop: '8px',
  },
  imageCard: {
    margin: 'auto',
    maxWidth: 500,
    height: 700,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: '300',
  },
  noImage: {
    margin: 'auto',
    width: 400,
    height: '400 !important',
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  button: {
    width: '-webkit-fill-available',
    borderRadius: '15px',
    padding: '15px 22px',
    color: '#000000a6',
    fontSize: '20px',
    fontWeight: 900,

  },
  
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: '416px',
    width: '100%',
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: "green",
    justifyContent: 'center',
    alignItems: 'center',

    boxShadow: "none",
    color: "white",
    width:"900px",
    borderRadius: "30px", // Adjust the value as needed
    height: "100px", 
    textshadow: '2px 2px 4px rgba(1, 40, 8, 0.49)',
    fontweight: 'bold',  // Adjust the value as needed
  },
  title: {
   ontSize: "18px",  
   color:' green',
   fontweight: 'bold',
   fontsize: '18px',
  //  marginLeft: theme.spacing(40), 
   marginTop: theme.spacing(2), 


  //  margintop: '45px',
  //  marginleft : 50px;
  //  fontfamily: 'Poppins', sans-serif;
  //  text-transform: uppercase;
  //  letter-spacing: 2px;
   textshadow: '2px 2px 4px rgba(1, 40, 8, 0.49)',// Adjust the value as needed
  
  },
  titre: {
    color:' green',
    fontweight: 'bold',
    // fontsize: '40px',
    fontSize:"20px",
    marginLeft: theme.spacing(40), 
    marginTop: theme.spacing(2), 
 
 
   //  margintop: '45px',
   //  marginleft : 50px;
   //  fontfamily: 'Poppins', sans-serif;
   //  text-transform: uppercase;
    //  letter-spacing: 2px;
    textshadow: '2px 2px 4px rgba(1, 40, 8, 0.49)',// Adjust the value as needed
   
   },
  card: {
    width: '300%',
   
    height: '90vh',
    backgroundColor:'#EFEFEF',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginTop: theme.spacing(-2), 
    marginLeft: theme.spacing(10), 
  },
  loader: {
    color: '#be6a77 !important',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  selectedImage: {
    width: '400px',
    height: 'auto',
  },
}));

const Maladie= () => {

  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  let confidence = 0;

  const [result, setResult] = useState(null);

  
  const sendFile = async () => {
    if (selectedFile) {
      let formData = new FormData();
      formData.append('image', selectedFile);
  
      try {
        const response = await axios.post('http://localhost:8000/predict', formData);
        const result = response.data.probability;
        setResult(response.data);
        console.log("Probability:", result);
        // Faites ce que vous voulez avec le résultat de probabilité
      } catch (error) {
        console.error('Erreur lors de la requête de prédiction:', error);
      }
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      console.log('Réponse:', response.data);
      setResult(response.data);
      // Faites ce que vous voulez avec la réponse du serveur
    } catch (error) {
      console.error('Erreur lors de la requête de prédiction:', error);
    }
  };
  

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsLoading(true);
    sendFile();
  }, [preview]);

  const onSelectFile  = async (files) => {
   
    if (!files || files.length === 0) {
      
       
      
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }
    const [responseData, setResponseData] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setResponseData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };

  return (
    <React.Fragment>
       <br/>
       <br/>
      {/* <AppBar position="static" className={classes.appbar}>
        <Toolbar>
         
      
          <div className={classes.grow} />
          <Typography className={classes.title} variant="p" noWrap>
          
          </Typography>
         
        </Toolbar>
      </AppBar> */}

      <br/>
     <br/>
     <br/>
     <div>
        {/* <button onClick={fetchData}>Récupérer les données</button> */}
        {responseData && <p>{responseData.message}</p>}
      </div>
      <Card style={{ height: '900px' }}>

      {/* className={classes.card} */}
      <Typography className={classes.titre} variant="h6" noWrap>
          <strong>Reconnaître la maladie de votre plante🌱</strong>
          </Typography>
          
      <Container maxWidth={false}  disableGutters={true}>
      {/* className={classes.mainContainer} */}
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              )}

 <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div >
        <label htmlFor="image">Image de votre plante :</label>
        <div className="input-group">
          <input type="file" id="image" name="image" accept="image/*" className="file-custom" onChange={handleImageChange} />
        </div>
      </div>
      <br/>
      <br/>
      {selectedImage && (
        <div className={classes.imageContainer}>
          <img src={selectedImage} alt="Selected plant" className={classes.selectedImage} />
        </div>
      )}
     

      <div>
        <button type="submit" className={classes.button}>Upload</button>
      </div>
      <br/>
    
        <div >
          <h3>Résultat  :</h3>
          <p>Nom de maladie : {result}</p>
          {/* <p>Prédiction : {result.prediction}</p> */}
        </div>
      
    </form>

              {/* {data && (
                <CardContent className={classes.detail}>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th" scope="row" className={classes.tableCell}>{data.class}</TableCell>
                          <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )} */}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress color="secondary" className={classes.loader} />
                  <Typography className={classes.title} variant="h6" noWrap></Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          {/* {data && (
            <Grid item className={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )} */}
        </Grid>
      </Container>
      </Card>
    </React.Fragment>
  );
};

export default Maladie;
