import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/candidate';

const Dashboard = () => {

  const navigate = useNavigate();
  const [userType, setUserType] = useState('candidate');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPendingUsers();
    }
  }, [navigate]);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${userType}/search`, {
        params: { is_verified: 'pending' }
      });
      setPendingUsers(response.data);
      setIsLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Set loading state to false even if there's an error
    }
  };

  const handleToggleUserType = async () => {
    setUserType((prevType) => (prevType === 'candidate' ? 'entreprise' : 'candidate'));
    setIsLoading(true); // Set loading state to true before fetching new data
    await fetchPendingUsers(); // Wait for fetchPendingUsers() to complete before updating isLoading
  };

  return (
    <div>
      <div className='mx-3 '>
      <button className='rounded-md border-solid border-2 border-black p-2 my-8 bg-stone-300' onClick={handleToggleUserType}>{userType === 'candidate' ? 'Enterprise' : 'Candidate'}</button>
      <h2 className='text-2xl text-3xl font-bold underline'>Pending Users:</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : (
        pendingUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))
      )}
    </div>
  );
};
export default Dashboard