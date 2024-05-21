import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const { first_name, last_name, name } = user; 
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/candidate/${user.userID}`, {state:user})
  };

  return (
    <div className = "mx-10 my-10 rounded-lg bg-white" style={{ width: 400, height: 110, border: '3px solid black', padding: 10, marginBottom: 10 }}>
      {user.name ? (
        <div className='bg-white'>Name: {name}</div>
      ) : (
        <div >
          <div className='bg-white'>First Name: {first_name}</div>
          <div className='bg-white'>Last Name: {last_name}</div>
        </div>
      )}
      <button className = "bg-slate-500 px-3 py-1 border-2 border-black rounded-lg text-white "style={{ float: 'right' }} onClick={handleDetailsClick}>Details</button>
    </div>
  );
};

export default UserCard;
