import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const CandidateProfile = ({ user }) => {
  const [userImages, setUserImages] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const navigate = useNavigate();
  const accountType = (state.name? "entreprise": "candidate")

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
  const handle_reject = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/${accountType}/update/${id}`, {
        is_verified: 'false'
      });
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handle_accept = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/${accountType}/update/${id}`, {
        is_verified: 'true'
      });
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handle_delete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/${id}`);
      console.log(response);
      // Navigate back to the users list page after deletion
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mx-8 my-9 '>
      <h1>{state.name? state.name: state.first_name +" "+ state.last_name}'s verification documents</h1>
      <button className='bg-lime-800 px-5 py-2 rounded-lg font-bold text-white my-3' onClick={handle_accept}>Verify</button>
      <button className='bg-rose-800 px-5 py-2 rounded-lg font-bold text-white mx-3 my-3' onClick={handle_reject}>Reject</button>
      <button className='bg-red-600 px-5 py-2 rounded-lg font-bold text-white mx-3 my-3' onClick={handle_delete}>Delete User</button>
      <p>account type: {accountType}</p>
      <p>is verified: {state.is_verified}</p>

      {state.is_verified === "pending" && (
        <>
          <h2>Images:</h2>
          {
            userImages.map((image, index) => (
              <img key={index} src={image.resource_link} alt={`User Image ${index}`} />
            ))
          }
        </>
      )}
    </div>
  );
};

export default CandidateProfile;
