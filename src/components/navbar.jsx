import React from 'react';
import { useNavigate, Link} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  

  return (
    <div className = "bg-black h-20 text-white " >
        <nav className='flex gap-10 items-center h-full text-xl p-10'>
            <Link to="/dashboard">Pensing Users</Link>
            <Link to="/allUsers">Users Dashboard</Link>
            <Link to="/candidate/1">Posts Dashboard</Link>
        </nav>

    </div>
  );
};

export default Navbar;
