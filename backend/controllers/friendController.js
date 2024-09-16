const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  const { username } = req.query;
  try {
    const users = await User.find({ username: new RegExp(username, "i") });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(userId);

    if (!user || !targetUser) return res.status(404).json({ message: "User not found" });
    if (user.friendRequests.includes(targetUser._id)) return res.status(400).json({ message: "Request already sent" });

    targetUser.friendRequests.push(user._id);
    await targetUser.save();
    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(userId);

    if (!user || !targetUser) return res.status(404).json({ message: "User not found" });

    if (!user.friendRequests.includes(targetUser._id)) return res.status(400).json({ message: "No request found" });

    user.friends.push(targetUser._id);
    targetUser.friends.push(user._id);

    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== targetUser._id.toString());
    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriendsRequest = async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).populate('friendRequests', 'username');
    res.json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getMutualFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username');
    const targetUser = await User.findById(userId).populate('friends', 'username');

    if (!user || !targetUser) return res.status(404).json({ message: 'User not found' });

    const userFriends = user.friends.map(friend => friend._id.toString());
    const targetUserFriends = targetUser.friends.map(friend => friend._id.toString());

    const mutualFriends = userFriends.filter(friendId => targetUserFriends.includes(friendId));

    const mutualFriendsDetails = await User.find({ _id: { $in: mutualFriends } }).select('username');

    res.json(mutualFriendsDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getDefaultUsers = async (req, res) => {
  try {
    // Fetch at least 4 users. Adjust query if necessary.
    const users = await User.find().limit(4).select('username');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};