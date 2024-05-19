import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const { first_name, last_name, name } = user; 
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/candidate/${user.userID}`)
  };

  return (
    <div style={{ width: 400, height: 100, border: '1px solid black', padding: 10, marginBottom: 10 }}>
      {user.name ? (
        <div>Name: {name}</div>
      ) : (
        <div>
          <div>First Name: {first_name}</div>
          <div>Last Name: {last_name}</div>
        </div>
      )}
      <button style={{ float: 'right' }} onClick={handleDetailsClick}>Details</button>
    </div>
  );
};

export default UserCard;
