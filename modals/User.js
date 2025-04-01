const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    password: String,
    name: String,
    dob: Date,
    gender: String,
    occupation: String,
    address: Object,
    email: {
      type : String,
      unique: true
    },
    phone: Number,
    adharCardNo: Number,
    panCardNo: String,
    joinedAt: Date,
    updateAt: Date,
    bankInfo: Object,
    nominee: Object,
    margin: {
        default: 0,
        type: Number
    },
    profilePhoto: String,
    status: {
        default : "Pending",
        type: String
    },
  requestedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)
