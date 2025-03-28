const express = require("express")
const User = require("../modals/User")
const router = express.Router()

router.post('/user', (req, res)=>{
   const newUser = new User(req.body)
   newUser.save()
   res.send("User Created Successfully!")
})

router.get('/user', async (req, res)=>{
   const allUsers = await User.find()
   res.status(200).send(allUsers)
})

router.put('/user/amount/:id', async(req, res)=>{
   const user = await User.findById(req.params.id)
   user.margin = req.body.margin || user.margin
   await user.save()
   res.status(200).send("Amount Updated Successfully")
})

router.put('/user/password/:id', async(req, res)=>{
   const user = await User.findById(req.params.id)
   user.password = req.body.password || user.password
   await user.save()
   res.status(200).send("Amount Updated Successfully")
})



module.exports = router