import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SubscriptionPopup from '../components/subscription';

const CandidateProfile = () => {
  const [userImages, setUserImages] = useState([]);
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const { state } = location;
  const { id } = useParams();
  const navigate = useNavigate();
  const accountType = state.name ? "entreprise" : "candidate";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/documents/${id}`, {
          params: { is_verified: 'pending' }
        });
        setUserImages(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchImages();
  }, [id]);

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:3000/${accountType}/update/${id}`, {
        is_verified: 'false'
      });
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:3000/${accountType}/update/${id}`, {
        is_verified: 'true'
      });
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openImageInNewTab = (imageSrc) => {
    window.open(imageSrc, '_blank');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">
          {state.name ? state.name : `${state.first_name} ${state.last_name}`}'s Verification Documents
        </h1>
        <div className="flex justify-between mb-6">
          <div>{accountType ==="entreprise" && 
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => setIsPopupOpen(true)}>
              + Add Subscription
            </button>}
          </div>
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleAccept}>
              Verify
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleReject}>
              Reject
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
              Delete User
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg"><strong>Account Type:</strong> {accountType}</p>
          <p className="text-lg"><strong>Is Verified:</strong> {state.is_verified}</p>
        </div>

        {state.is_verified === "pending" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Images:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userImages.map((image, index) => (
                <img
                  key={index}
                  className="rounded-lg shadow-md cursor-pointer"
                  src={image.resource_link}
                  alt={`User Image ${index}`}
                  onClick={() => openImageInNewTab(image.resource_link)}
                />
              ))}
            </div>
          </div>
        )}
        {isPopupOpen && (
          <SubscriptionPopup
            userID={id}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
