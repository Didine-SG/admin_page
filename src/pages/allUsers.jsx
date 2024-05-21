import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/candidate';

const UsersPage = () => {
  const [userType, setUserType] = useState('candidate');
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const [userID, setUserID]= useState()


  const buildQueryString = (params) => {
    const query = new URLSearchParams();
    for (const key in params) {
      if (params[key]) {
        query.append(key, params[key]);
      }
    }
    return query.toString();
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchAllUsers();
      console.log(users)
    }
  }, [navigate, userType]);

  const fetchAllUsers = async () => {
    try {
      let url;
      let response; // Declare response here
  
      if (userID) {
        console.log('searched with userID');
        url = `http://localhost:3000/${userType}/get/${userID}`;
        response = await axios.get(url);
        setUsers([response.data.userData]);
      } else {
        url = `http://localhost:3000/${userType}/search`;
        response = await axios.get(url);
        setUsers(response.data);
      }
      console.log(url);
      console.log(response); // Now you can access response here
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        // Client error, set users to empty array
        setUsers([]);}
    }
  };

  const handleToggleUserType = () => {
    setUserType((prevType) => (prevType === 'candidate' ? 'entreprise' : 'candidate'));
    fetchAllUsers()
  };

  const handleInputChange = (e) => {
    setUserID(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllUsers();
  };

  return (
    <div>
      <div className='my-12 mx-12'>
        <button className='rounded-md border-solid border-1 border-black p-2 my-8 bg-stone-300' onClick={handleToggleUserType}>
          {userType === 'candidate' ? 'Enterprise' : 'Candidate'}
        </button>
        <form onSubmit={handleSearchSubmit}>
          <input type="number" value={userID} onChange={handleInputChange} placeholder="Search by userID" />
          <input type="submit" value='Search' />
        </form>
      </div>

      {users.length === 0 ? ( // Check if users array is empty
      <p>No users found</p>
    ) : (
      users.map(user => (
        <UserCard key={user.userID} user={user} />
      ))
    )}
    </div>
  );
};
export default UsersPage