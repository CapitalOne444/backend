const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    mode: String,
    transactionId: String,
    created_at : Date.now(),
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : Date.now()
})

module.exports = mongoose.model("Transaction", TransactionSchema)