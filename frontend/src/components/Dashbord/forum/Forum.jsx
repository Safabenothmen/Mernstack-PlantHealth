import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  Typography,
  Button,
  Card,
  CardContent,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@mui/icons-material/Star';

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
  createPubButton:{
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#a5aaad',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '10px',
    marginRight: '10px',
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
    alignItems: 'flex-start',
  },
  searchContainer: {
    marginTop: 40,
    display: 'flex',
    
    alignItems: 'flex-start',

  },
  
  searchInput: {
    marginRight: 10,
    
  },
}));

const Forum = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isExpertAd, setIsExpertAd] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const openAuthorDialog = (author) => {
    setSelectedAuthor(author);
  };

  const closeAuthorDialog = () => {
    setSelectedAuthor(null);
  };

  const navigateToPostDetails = (postId) => {
    navigate(`/dashboard/post/${postId}`);
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setFilteredPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la publication:', error);
    }
  };

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.titre.toLowerCase().includes(value.toLowerCase()) ||
          post.nom.toLowerCase().includes(value.toLowerCase()) ||
          post.prenom.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        const updatedPosts = response.data.map((post) => ({
          ...post,
          isExpert: post.role === 'expert',
          isAgriculteur: post.role === 'agriculteur',
        }));
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);

        const currentAd = updatedPosts.find((post) => post.isExpert);
        setIsExpertAd(!!currentAd);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      if (searchTerm.trim() === '') {
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter((post) =>
        post.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        
        post.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.prenom.toLowerCase().includes(searchTerm.toLowerCase())
          
        );
        setFilteredPosts(filtered);
      }
    };

    filterPosts();
  }, [searchTerm, posts]);

  // useEffect(() => {
  //   setUserRole('agriculteur'); // Replace this with the actual logic to get the user's role
  //   setUserId('user-id'); // Replace 'user-id' with the actual ID of the logged-in user
  // }, []);

  return (
    <div className={`${classes.forumContainer} ${classes.alignLeft} `}>
      <div className="input-group rounded  "style={{ width: '200px' }}>
  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
  variant="outilined"
  value={searchTerm}
  onChange={handleSearchTermChange} />
  <span className="input-group-text border-0" id="search-addon">
  <FontAwesomeIcon icon={faSearch} className="icon" />

    {/* <i className="fas fa-search"></i> */}
  </span>
</div>
      <br />
      <Typography variant="h1" className={classes.title}>
        Forum de discussion
      </Typography>
      <br />
      <div className={classes.searchContainer}>
      {/* <TextField
  className={classes.searchInput}
  label="Rechercher"
  variant="outlined"
  value={searchTerm}
  onChange={handleSearchTermChange}
/> */}







      </div>
      <Link to="/dashboard/Post" className={classes.createPostButton}>
        Créer un poste
      </Link>

      <Link to="/dashboard/Mespub" className={classes.createPubButton}>
      Mes publications
      </Link>
      <br />
      <br />
      {filteredPosts.map((post) => (
        <Card key={post._id} className={classes.postCard}>
          <Card className={classes.card}>
            <div className={classes.postHeaderContent}>
              <Typography
                variant="body1"
                className={classes.postAuthor}
                onClick={() =>
                  openAuthorDialog({ nom: post.nom, prenom: post.prenom })
                }
              >
                {post.nom} {post.prenom}
                {post.role === 'expert' && <span>(Expert)</span>}
              </Typography>
              <Typography variant="body1" className={classes.postDate}>
                {post.created}
              </Typography>
              {/* <DeleteIcon
                className={classes.deleteIcon}
                onClick={() => deletePost(post._id)}
              /> */}
            </div>
          </Card>
          <CardContent
            onClick={() => navigateToPostDetails(post._id)}
          >
            <Typography variant="h2" className={classes.postTitle}>
              {post.titre}
            </Typography>
            {/* Display other post details here */}
          </CardContent>
        </Card>
      ))}

      {/* Author Dialog */}
      <Dialog open={!!selectedAuthor} onClose={closeAuthorDialog}>
        <DialogTitle>Author Details</DialogTitle>
        <DialogContent>
          {selectedAuthor && (
            <Typography>
              Nom & Prénom: {selectedAuthor.nom} {selectedAuthor.prenom}
              Role: {selectedAuthor.role}
            </Typography>
          )}
          {/* Add more author details here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forum;
