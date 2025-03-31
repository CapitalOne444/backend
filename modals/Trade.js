const mongoose = require('mongoose')

const TradeSchema = new mongoose.Schema({
    userId: String,
    indexes: String,
    stockName: String,
    option: String,
    quantity:Number,
    averagePrice:Number,
    investmentAmount: Number,
    type: String,
    created_at : Date.now,
    status: {
        type: String,
        default: "Pending"
    },
    updated_at : Date.now
})

module.exports = mongoose.model("Trade", TradeSchema)