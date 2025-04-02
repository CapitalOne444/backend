const mongoose = require('mongoose')

const TradeSchema = new mongoose.Schema({
    tradeId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    indexes: String,
    stockName: String,
    option: String,
    tradeList: Array, 
    
   
   
})

module.exports = mongoose.model("Trade", TradeSchema)