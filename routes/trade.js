const express = require("express")
const Trade = require("../modals/Trade")
const User = require("../modals/User")
const sendEmail = require('../controllers/emailController')
const router = express.Router()

router.put("/trade/:tradeId/edit/:subTradeId", async (req, res) => {
    try {
        
        const { tradeId, subTradeId } = req.params;
        const { quantity, averagePrice, investmentAmount, type } = req.body;

        // ✅ Find Trade
        const trade = await Trade.findById(tradeId);
        if (!trade) return res.status(404).json({ message: "Trade not found" });

        // ✅ Find Sub Trade
        const subTrade = trade.tradeList.find(t => t._id.toString() === subTradeId);
        if (!subTrade) return res.status(404).json({ message: "Sub Trade not found" });

        // ✅ Update Fields
        subTrade.quantity = quantity;
        subTrade.averagePrice = averagePrice;
        subTrade.investmentAmount = investmentAmount;
        subTrade.type = type;
        subTrade.updated_at = new Date();

        // ✅ Save Trade
        await trade.save();

        // const user = User.findById(trade.userId)
        // const subject = "Trade Request - Capital One";
        // const message = `<p>Your trade of ₹${subTrade.investmentAmount} has been pending.</p>`;
        // await sendEmail(user.email, subject, message, user.name);

        res.json({ message: "Trade updated successfully", trade });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


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

        const user = await User.findById(trade.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        if (user.margin < newTrade.investmentAmount && newTrade.type == "buy"){
            return res.status(500).json({message : "You have insufficient balance"})
        }
        user.margin = newTrade.type == "buy" ? user.margin - newTrade.investmentAmount : user.margin;
        console.log(user.margin, newTrade.investmentAmount)
        await user.save();

        trade.tradeList.push(newTrade);
        await trade.save();

        const subject = "Trade Request - Capital One";
        const message = `<p>Your trade of ₹${newTrade.investmentAmount} has been pendding.</p>`;
        await sendEmail(user.email, subject, message, user.name);

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
        console.log(id, subTradeId, status)
        // ✅ 1. Trade find karo
        const trade = await Trade.findById(id);
        if (!trade) return res.status(404).json({ message: "Trade not found" });
    
        // ✅ 2. Trade List me specific trade find karo
        const subTrade = trade.tradeList.find(t => t._id.toString() === subTradeId);
        if (!subTrade) return res.status(404).json({ message: "Sub Trade not found" });
     
        // ✅ 3. Status Update karo
        subTrade.status = status;
        // subTrade.updated_at = new Date();

        const user = await User.findById(trade.userId)
        user.margin = status == "Approved" && subTrade.type == "exit" ? user.margin + subTrade.investmentAmount : user.margin
        console.log(subTrade.status, user.margin)
        await user.save()
        // ✅ 4. Save Trade
        await trade.save();

        const subject = "Trade Request - Capital One";
        const message = `<p>Your trade of ₹${subTrade.investmentAmount} has been pendding.</p>`;
        await sendEmail(user.email, subject, message, user.name);

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
    if (user.margin < newTrade.mainTrade.investmentAmount){
        return res.status(500).json({ message: "You have insufficient balance" });
    }
    user.margin -= newTrade.mainTrade.investmentAmount;
    console.log(user.margin, newTrade.mainTrade.investmentAmount)
    await user.save();

    const subject = "Trade Request - Capital One";
    const message = `<p>Your trade of ₹${newTrade.mainTrade.investmentAmount} has been pendding.</p>`;
  
    await sendEmail(user.email, subject, message, user.name);
    res.send("Trade Created Successfully!")
})

router.get('/trade', async (req, res) => {
    const allTrades = await Trade.find()
    res.status(200).send(allTrades)
})

router.put('/trade/:userId', async (req, res) => {
   
    console.log(req.body)
    await Trade.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send("Updated Successfully")
})
router.get('/trade/:userId', async (req, res) => {
    const allTrades = await Trade.find()
    const userTrades =  allTrades.filter((i)=> i.userId == req.params.id)
    res.status(200).send(userTrades)
   
})



module.exports = router
