import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts/mypost');
      setPosts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications:', error);
    }
  };

  return (
    <div>
      <h1>Mes publications</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.titre}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
