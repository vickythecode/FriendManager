import React, { useState, useEffect } from 'react';
import friendService from '../services/friendService'; // Adjust the path as needed
import './FriendSearch.css'; // Import the CSS file

const FriendSearch = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [mutualFriends, setMutualFriends] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchDefaultUsers = async () => {
      try {
        const result = await friendService.getDefaultUsers(token);
        setUsers(Array.isArray(result) ? result : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching default users:', error);
        setError('Failed to fetch default users. Please check your authentication.');
        setUsers([]);
      }
    };

    fetchDefaultUsers();
  }, [token]);

  useEffect(() => {
    if (searchTerm) {
      const fetchUsers = async () => {
        try {
          const result = await friendService.searchUsers(searchTerm, token);
          setUsers(Array.isArray(result) ? result : []);
          setError(null);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError('Failed to fetch users. Please check your authentication.');
          setUsers([]);
        }
      };

      fetchUsers();
    }
  }, [searchTerm, token]);

  const handleSendRequest = async (userId) => {
    try {
      await friendService.sendFriendRequest(userId, token);
      alert('Friend request sent!');
    } catch (error) {
      console.error('Failed to send friend request:', error.message);
      alert('Failed to send friend request. Please try again.');
    }
  };

  const handleViewMutualFriends = async (userId) => {
    try {
      const result = await friendService.getMutualFriends(userId, token);
      setMutualFriends(result);
      setSelectedUserId(userId);
    } catch (error) {
      console.error('Failed to fetch mutual friends:', error.message);
      alert('Failed to fetch mutual friends. Please try again.');
    }
  };

  return (
    <div className="friend-search-container">
      <input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="friend-search-input"
      />
      {error && <p className="friend-search-error">{error}</p>}
      <ul className="friend-search-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="friend-search-item">
              {user.username}
              <button onClick={() => handleSendRequest(user._id)} className="friend-search-button">
                Send Request
              </button>
              <button onClick={() => handleViewMutualFriends(user._id)} className="friend-search-button">
                View Mutual Friends
              </button>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      {selectedUserId && (
        <div className="mutual-friends-container">
          <h3>Mutual Friends with {users.find(user => user._id === selectedUserId)?.username}:</h3>
          <ul className="mutual-friends-list">
            {mutualFriends.length > 0 ? (
              mutualFriends.map((friend) => (
                <li key={friend._id} className="mutual-friend-item">{friend.username}</li>
              ))
            ) : (
              <p>No mutual friends</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendSearch;
