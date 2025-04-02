const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    utr: String,
    amount: Number,
    mode: String,
    transactionId: String,
    created_at : { type: Date, default: Date.now },
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model("Transaction", TransactionSchema)