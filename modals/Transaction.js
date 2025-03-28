const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    mode: String,
    transactionId: String,
    created_at : String,
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : String
})

module.exports = mongoose.model("Transaction", TransactionSchema)