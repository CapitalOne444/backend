const mongoose = require('mongoose')

const WithdarwalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    mode: String,
    created_at : String,
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : String
})

module.exports = mongoose.model("Withdarwal", WithdarwalSchema)