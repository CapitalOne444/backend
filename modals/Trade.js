const mongoose = require('mongoose')

const TradeSchema = new mongoose.Schema({
    tradeId: String,
    userId: String,
    indexes: String,
    stockName: String,
    option: String,
    tradeList: [
        {
            quantity : Number,
            averagePrice:Number,
            investmentAmount: Number,
            type: String,
            created_at : { type: Date, default: Date.now },
            status: {
                type: String,
                default: "Pending",
                updated_at : { type: Date, default: Date.now }
            },
        }
    ], 
    
   
   
})

module.exports = mongoose.model("Trade", TradeSchema)