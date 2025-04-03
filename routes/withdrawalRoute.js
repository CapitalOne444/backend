const express = require("express")
const Withdarwal = require('../modals/Withdrawal')
const User = require("../modals/User")
const router = express.Router()

router.post('/withdarwal',async (req, res)=>{
   const newWithdarwal = new Withdarwal(req.body)
   await newWithdarwal.save()
   
   const user = await User.findById(newWithdarwal.userId)
   user.margin -= newWithdarwal.amount
   await user.save()

   const subject = "Trade Request - Capital One";
   const message = `<p>Your trade of ₹${req.body.amount} has been pendding.</p>`;
   await sendEmail(user.email, subject, message, user.name);
   
   res.status(201).send("Withdarwal Created Successfully!")
})

router.get('/withdarwal', async (req, res)=>{
   const allwithdarwals = await Withdarwal.find().find().populate('userId', 'name')
   res.status(200).send(allwithdarwals)
})

router.put('/withdarwal/:id', async(req, res)=>{
   const withdarwal = await Withdarwal.findById(req.params.id)

   withdarwal.userId = req.body.userId || withdarwal.userId
   withdarwal.amount = req.body.amount || withdarwal.amount
   withdarwal.mode = req.body.mode || withdarwal.mode
   withdarwal.withdarwalId = req.body.withdarwalId || withdarwal.withdarwalId
   withdarwal.created_at = req.body.created_at || withdarwal.created_at
   withdarwal.updated_at = req.body.updated_at || withdarwal.updated_at
   withdarwal.status = req.body.status || withdarwal.status

   await withdarwal.save()

   const user = User.findById(trade.userId)
      const subject = "Trade Request - Capital One";
      const message = `<p>Your trade of ₹${withdarwal.amount} has been pendding.</p>`;
      await sendEmail(user.email, subject, message, user.name);
   res.status(201).send("Withdarwal Updated Successfully!")
})

router.delete('/withdarwal/:id', async(req, res)=>{
   await Withdarwal.findByIdAndDelete(req.params.id)
   res.status(200).send("Withdarwal Deleted Successfully")
})
module.exports = router