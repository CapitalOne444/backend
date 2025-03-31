const express = require("express")
const Trade = require("../modals/Trade")
const router = express.Router()

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

router.put('/trade/amount/:id', async(req, res)=>{
   const trade = await Trade.findById(req.params.id)
   trade.margin = req.body.margin || trade.margin
   await trade.save()
   res.status(200).send("Amount Updated Successfully")
})

router.put('/trade/password/:id', async(req, res)=>{
   const trade = await Trade.findById(req.params.id)
   trade.password = req.body.password || trade.password
   await trade.save()
   res.status(200).send("Amount Updated Successfully")
})



module.exports = router
