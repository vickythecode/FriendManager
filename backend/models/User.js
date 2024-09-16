const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model("User",UserSchema);