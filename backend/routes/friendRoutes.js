const express = require('express');
const { searchUsers, sendFriendRequest, acceptFriendRequest,getFriendsRequest,getMutualFriends,getDefaultUsers } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.get("/search", authMiddleware, searchUsers);
router.post("/friend-request/:userId", authMiddleware, sendFriendRequest);
router.post("/accept-friend-request/:userId", authMiddleware, acceptFriendRequest);
router.get("/requests",authMiddleware,getFriendsRequest)
router.get('/mutual-friends/:userId', authMiddleware, getMutualFriends);
router.get('/default-users', authMiddleware, getDefaultUsers);

module.exports = router;
