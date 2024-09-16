const API_URL = 'http://localhost:5000/api/friends';

const getDefaultUsers = async (token) => {
  const response = await fetch(`${API_URL}/default-users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch default users');
  }
  return result;
};

const searchUsers = async (username, token) => {
  const response = await fetch(`${API_URL}/search?username=${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

const sendFriendRequest = async (userId, token) => {
  await fetch(`${API_URL}/friend-request/${userId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const getFriendRequests = async (token) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch friend requests');
  }
  return result;
};

const acceptFriendRequest = async (userId, token) => {
  await fetch(`${API_URL}/accept-friend-request/${userId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const getMutualFriends = async (userId, token) => {
  const response = await fetch(`${API_URL}/mutual-friends/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch mutual friends');
  }
  return result;
};

export default { searchUsers, sendFriendRequest, getFriendRequests, acceptFriendRequest, getMutualFriends, getDefaultUsers };
