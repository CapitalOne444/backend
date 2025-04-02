const mongoose = require('mongoose')

const TradeItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique ID for each trade object
    averagePrice: Number, 
    type:String,
    status: String,
    investmentAmount: Number, 
    quantity: Number,
    created_at: { type: Date, default: Date.now }
});

const TradeSchema = new mongoose.Schema({
    tradeId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    indexes: String,
    stockName: String,
    option: String,
    tradeList: [TradeItemSchema]  // Array of trade objects with unique ID    
   
   
})

module.exports = mongoose.model("Trade", TradeSchema)
