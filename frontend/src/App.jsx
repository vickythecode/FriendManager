import React, { useState } from 'react';
import Auth from './components/Auth';
import FriendSearch from './components/FriendSearch';
import FriendRequest from './components/FriendRequest';

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (
    <div>
      <h1>Friend Manager</h1>
      <FriendSearch token={token} />
      <FriendRequest token={token} />
    </div>
  );
}

export default App;
