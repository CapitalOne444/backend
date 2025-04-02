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



module.exports = router
