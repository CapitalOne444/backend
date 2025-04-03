const express = require("express")
const Trade = require("../modals/Trade")
const User = require("../modals/User")

const router = express.Router()

router.put("/trade/add/:id", async (req, res) => {
    
    try {
        
        const { averagePrice,
            type,
            status,
            investmentAmount,
            quantity } = req.body;
            
        const trade = await Trade.findById(req.params.id);
        console.log(trade, req.body)    
        if (!trade) return res.status(404).json({ message: "Trade not found" });

        const newTrade = {
            averagePrice,
            type,
            status,
            investmentAmount,
            quantity,
            created_at: new Date(),
        };
        trade.mainTrade.investmentAmount = type == "buy" ? trade.mainTrade.investmentAmount + investmentAmount : trade.mainTrade.investmentAmount - investmentAmount
        trade.mainTrade.quantity = type == "buy" ? trade.mainTrade.quantity + quantity : trade.mainTrade.quantity - quantity

        trade.tradeList.push(newTrade);
        await trade.save();

        res.json({ message: "Trade added successfully", trade });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Approve/Reject Individual Trade Inside Trade List
router.put("/trade/:id/update/:subTradeId", async (req, res) => {
    try {
        const { id, subTradeId } = req.params;
        const { status } = req.body; // Status "Approved" ya "Rejected" aayega
        console.log(id, subTradeId)
        // ✅ 1. Trade find karo
        const trade = await Trade.findById(id);
        if (!trade) return res.status(404).json({ message: "Trade not found" });

        // ✅ 2. Trade List me specific trade find karo
        const subTrade = trade.tradeList.find(t => t._id.toString() === subTradeId);
        if (!subTrade) return res.status(404).json({ message: "Sub Trade not found" });

        // ✅ 3. Status Update karo
        subTrade.status = status;
        subTrade.updated_at = new Date();

        // ✅ 4. Save Trade
        await trade.save();

        res.json({ message: `Trade ${status} successfully`, trade });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/trade', async (req, res) => {
    const newTrade = new Trade(req.body)
    newTrade.save()

    const user = await User.findById(newTrade.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    console.log(user.margin)
    user.margin -= newTrade.mainTrade.investmentAmount;
    console.log(user.margin, newTrade.mainTrade.investmentAmount)
    await user.save();
    res.send("Trade Created Successfully!")
})

router.get('/trade', async (req, res) => {
    const allTrades = await Trade.find()
    res.status(200).send(allTrades)
})

router.put('/trade/:id', async (req, res) => {
    console.log(req.body)
    await Trade.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send("Updated Successfully")
})



module.exports = router
