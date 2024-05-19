import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const CandidateProfile = () => {
  const [userImages, setUserImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchimages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/documents/${id}`, {
          params: { is_verified: 'pending' }
        });
        console.log(response.data)

        setUserImages(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchimages();
    console.log(userImages)
  }, [id]);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>You are logged in.</p>
      <h2>Images: </h2>
      {
        userImages.map((image, index) => (
          <img key={index} src={image.resource_link} alt={`User Image ${index}`} />
        ))
      }
    </div>
  );
};

export default CandidateProfile;
