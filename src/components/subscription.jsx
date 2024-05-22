import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionPopup = ({ userID, onClose }) => {
  const [subscriptionID, setSubscriptionID] = useState('');
  
  const handleAddSubscription = async () => {
    try {
      // Send POST request to create a new subscription
      await axios.post('http://localhost:3000/subscription/new', {
        userID: userID,
        subscriptionInfoID: subscriptionID
      });
      onClose(); // Close the popup after adding subscription
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
        <div className="flex items-center mb-4">
          <label className="mr-2">Subscription ID:</label>
          <select className="border border-gray-300 rounded py-1 px-2" value={subscriptionID} onChange={(e) => setSubscriptionID(e.target.value)}>
            <option value="">Select Subscription ID</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mr-2" onClick={handleAddSubscription}>
          Add
        </button>
        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
