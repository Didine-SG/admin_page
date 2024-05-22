import React from 'react';
import { useNavigate, Link} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black h-20 text-white">
      <nav className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-lg font-semibold hover:text-gray-300">Pending Users</Link>
          <Link to="/allUsers" className="text-lg font-semibold ml-4 hover:text-gray-300">Users Dashboard</Link>
          <Link to="/candidate/1" className="text-lg font-semibold ml-4 hover:text-gray-300">Posts Dashboard</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
