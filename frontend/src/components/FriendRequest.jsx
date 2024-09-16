import React, { useState, useEffect } from 'react';
import friendService from '../services/friendService';
import './FriendRequest.css'; // Import the CSS file

const FriendRequest = ({ token }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await friendService.getFriendRequests(token);
        setRequests(result);
      } catch (error) {
        console.error('Failed to fetch friend requests:', error.message);
        if (error.message === 'Invalid token') {
          alert('Session expired. Please log in again.');
          // Redirect to login or handle session expiration
        }
      }
    };

    fetchRequests();
  }, [token]);

  const handleAccept = async (userId) => {
    try {
      await friendService.acceptFriendRequest(userId, token);
      setRequests(requests.filter((req) => req._id !== userId));
    } catch (error) {
      console.error('Failed to accept friend request:', error.message);
    }
  };

  return (
    <div className="friend-request-container">
      <h2 className="friend-request-heading">Friend Requests</h2>
      <ul className="friend-request-list">
        {requests.length > 0 ? (
          requests.map((user) => (
            <li key={user._id} className="friend-request-item">
              {user.username}
              <button onClick={() => handleAccept(user._id)} className="friend-request-button">
                Accept
              </button>
            </li>
          ))
        ) : (
          <li className="friend-request-item">No friend requests available.</li>
        )}
      </ul>
    </div>
  );
};

export default FriendRequest;
