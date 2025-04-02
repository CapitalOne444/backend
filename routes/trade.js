const express = require("express")
const Trade = require("../modals/Trade")
const router = express.Router()

router.put("/trade/:tradeId", async (req, res) => {
    try {
        const { tradeId } = req.params;
        const { averagePrice, 
            type,
            status,
            investmentAmount, 
            quantity } = req.body;

        const trade = await Trade.findOne({ tradeId });

        if (!trade) return res.status(404).json({ message: "Trade not found" });

        const newTrade = {
            _id: new mongoose.Types.ObjectId(),
            averagePrice, 
            type,
            status,
            investmentAmount, 
            quantity,
            created_at: new Date(),
        };

        trade.tradeList.push(newTrade);
        await trade.save();

        res.json({ message: "Trade added successfully", trade });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/trade', (req, res)=>{
   const newTrade = new Trade(req.body)
   newTrade.save()
   res.send("Trade Created Successfully!")
})

router.get('/trade', async (req, res)=>{
   const allTrades = await Trade.find()
   res.status(200).send(allTrades)
})

router.put('/trade/:id', async(req, res)=>{
   console.log(req.body)
   await Trade.findByIdAndUpdate(req.params.id, req.body)
   res.status(200).send("Updated Successfully")
})



module.exports = router
