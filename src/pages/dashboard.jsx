import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/candidate';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('candidate');
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPendingUsers(userType); // Fetch data based on the current userType
    }
  }, [navigate, userType]); // Fetch data whenever userType changes

  const fetchPendingUsers = async (type) => {
    try {
      console.log(`fetching for ${userType}`)
      const response = await axios.get(`http://localhost:3000/${type}/search`, {
        params: { is_verified: 'pending' },
      });
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleUserType = () => {
    setUserType((prevType) => (prevType === 'candidate' ? 'entreprise' : 'candidate'));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
          onClick={handleToggleUserType}
        >
          {userType === 'candidate' ? 'Candidate' : 'Entreprise'}
        </button>
        <h2 className="text-3xl font-bold underline">Users Pending Verification</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
