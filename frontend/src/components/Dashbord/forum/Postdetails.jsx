import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, makeStyles,CardMedia } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useHistory } from 'react-router-dom';

// import aa from'../uploads/vagrok.jpeg'








const useStyles = makeStyles((theme) => ({
  postDetailsContainer: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: 30,
    textAlign: 'left',
  },
  postImage: {
    width: '100%',
    height: 'auto',
    marginBottom: 20,
  },
  
  postContainer: {
    backgroundColor: 'white',
    maxWidth: 1000,
    margin: '0 auto',
    padding: 20,
    textAlign: 'left',
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#78b097',
  },
 
  postImage: {
    maxWidth: '50%',
    height: 'auto',
    marginBottom: 20,
  },
  commentContainer: {
    marginTop: 20,
  },
  commentInput: {
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
    width: '90%',
  },
  commentButton: {
    marginBottom: 10,
  },
  commentList: {
    color: '#fff',
    padding: '10px 16px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  commentItem: {
    marginBottom: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  commentAuthor: {
    marginLeft: 5,
    fontSize: 15,
    color: 'white',
  },
}));


const PostDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [role, setUserRole] = useState('');

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
        console.log(response.data);
   
        setComments(response.data.comments);
        setUserRole(response.data.userRole);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la publication:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (commentText.trim() === '') {
      return; // Ne rien faire si le commentaire est vide ou ne contient que des espaces
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${id}/comments`,
        {
          postId: id,

          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setCommentText('');
      setComments([...comments, response.data]);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création du commentaire:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCommentSubmit(event);
    }
  };


  // const handleLike = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/posts/${id}/like`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );
  //     setLiked(true);
  //     setDisliked(false);
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour du like:', error);
  //   }
  // };

  // const handleUnlike = async () => {
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/posts/${id}/unlike`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );
  //     setLiked(false);
  //     setDisliked(false);
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour du unlike:', error);
  //   }
  // };


  if (!post) {
    return <Typography variant="h2">Chargement en cours...</Typography>;
  }

  return (
    <div className={classes.postDetailsContainer}>
        <div className={classes.postContainer}>
        <Card>
          <Card className={classes.card}>
      <Typography variant="h1" className={classes.postTitle}>
        {post.nom} {post.prenom} {post.role === 'expert' && '(Expert)'}
      </Typography>
      </Card>
      
        <CardContent>
          <Typography variant="body1" className={classes.postContent}>
            <strong>{post.titre}</strong>
          </Typography>
          <Typography variant="body1" className={classes.postContent}>
            {post.description}
          </Typography>
          <Typography variant="body1" className={classes.postContent}>
            
              {console.log(post.photo)}
             

              <CardMedia  component="img"
            alt="green iguana"
            
            src={post.photo.url} className={classes.postImage}></CardMedia>
         


 
 




  



           
       

          </Typography>
          <div>
          {liked ? (
            <ThumbUpIcon style={{ marginRight: '5px' }}  />
          ) : (
            <ThumbUpIcon style={{ marginRight: '5px' }} />
          )}
          {disliked ? (
            <ThumbDownIcon  />
          ) : (
            <ThumbDownIcon  />
          )}
        </div>
        </CardContent>
        <Card>
    
        </Card>
      </Card>
  

      <div className={classes.commentContainer}>
        <form onSubmit={handleCommentSubmit}>
          <TextField
            className={classes.commentInput}
            label="Ajouter un commentaire"
            // variant="outlined"
            value={commentText}
            onChange={handleCommentTextChange}
            onKeyDown={handleKeyDown}
          />
       
        </form>
        {comments.map((comment) => (
  <Card>
    <Card className={classes.card}>
      <Typography
        variant="caption"
        color="textSecondary"
        className={classes.commentAuthor}
        style={{ fontWeight: 'bold' }}
      >
        {comment.nom} {comment.prenom} {comment.role === 'expert' && <span>(Expert)</span>}
        

      </Typography>
    </Card>

    <Card className={classes.commentList}>
      <div key={comment._id} className={classes.commentItem}>
        <Typography variant="body2" className={classes.commentText}>
          {comment.text}
        </Typography>
       
      </div>
      
    </Card>
   
  </Card>
))}

         
       </div>
    
      </div>
    </div>
  );
};

export default PostDetails;
