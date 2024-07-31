import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if required
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des publications');
      }

      const postsData = await response.json();
      setPosts(postsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications:', error);
      // Handle error
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/supprime/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if required
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la publication');
      }

      // Remove the deleted post from the local state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la publication:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Liste des publications</h2>
      {posts.map((post) => (
        <Card key={post._id} style={{ marginBottom: '20px' }}>
          <CardHeader title={`${post.nom} ${post.prenom}`} />
          <CardContent>
            <h3>{post.titre}</h3>
            <p>{post.description}</p>
            <Button variant="contained" color="green" onClick={() => deletePost(post._id)}>Supprimer</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
