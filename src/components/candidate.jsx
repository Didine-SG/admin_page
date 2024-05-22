import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const { first_name, last_name, name } = user; 
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/candidate/${user.userID}`, { state: user });
  };

  return (
    <div className="max-w-md mx-10 my-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
      <div className="mb-4">
        {user.name ? (
          <div className="text-lg font-semibold text-gray-800">Name: {name}</div>
        ) : (
          <div>
            <div className="text-lg font-semibold text-gray-800">First Name: {first_name}</div>
            <div className="text-lg font-semibold text-gray-800">Last Name: {last_name}</div>
          </div>
        )}
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
        onClick={handleDetailsClick}
      >
        Details
      </button>
    </div>
  );
};

export default UserCard;
