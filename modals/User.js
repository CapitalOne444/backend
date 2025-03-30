const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    password: String,
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    occupation: String,
    address: Object,
    email: String,
    mobileNo: Object,
    adharCardNo: Number,
    panCardNo: String,
    joinedAt: Date,
    updateAt: Date,
    bankInfo: Object,
    nominee: Object,
    margin: Number,
    profilePhoto: String,
    status: {
        default : "Pending",
        type: String
    },
  requestedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)
