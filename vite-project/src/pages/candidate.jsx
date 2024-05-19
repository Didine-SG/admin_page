import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const [userImages, setUserImages] = useState([]);
const { id } = useParams();

const CandidateProfile = () => {
  const navigate = useNavigate();
  const fetchimages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/documents/:${id}`, {
        params: { is_verified: 'pending' }
      });
      setPendingUsers(response.data);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Set loading state to false even if there's an error
    }
  };
  return (
    <div>
      <h1>profile page</h1>
      <p>You are logged in.</p>
      <h2>images: </h2>
      {
        userImages.map(image => (
          <img src='image'/>
        ))
      }

    </div>
  );
};
export default CandidateProfile;