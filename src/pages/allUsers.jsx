import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/candidate';

const UsersPage = () => {
  const [userType, setUserType] = useState('candidate');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchAllUsers();
    }
  }, [navigate, userType]);

  const fetchAllUsers = async () => {
    try {
      console.log(`fetching for ${userType}`)
      let url;
      let response;

      if (userID) {
        url = `http://localhost:3000/${userType}/get/${userID}`;
        response = await axios.get(url);
        setUsers([response.data.userData]);
      } else {
        url = `http://localhost:3000/${userType}/search`;
        response = await axios.get(url);
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setUsers([]);
      }
    }
  };

  const handleToggleUserType = () => {
    setUserType((prevType) => (prevType === 'candidate' ? 'entreprise' : 'candidate'));
  };

  const handleInputChange = (e) => {
    setUserID(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllUsers();
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className="my-6 flex justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
          onClick={handleToggleUserType}
        >
          {userType === 'candidate' ? 'Candidate' : 'Entreprise'}
        </button>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
          <input
            type="number"
            value={userID}
            onChange={handleInputChange}
            placeholder="Search by userID"
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="submit"
            value="Search"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow cursor-pointer"
          />
        </form>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard key={user.userID} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
