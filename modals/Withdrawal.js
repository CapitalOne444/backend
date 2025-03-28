const mongoose = require('mongoose')

const WithdarwalSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    mode: String,
    created_at : Date.now(),
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : Date.now()
})

module.exports = mongoose.model("Withdarwal", WithdarwalSchema)