const express = require("express")
const Transaction = require('../modals/Transaction')
const router = express.Router()

router.post('/transaction', async (req, res) => {
   const newTransaction = new Transaction(req.body)
   await newTransaction.save()
   res.status(201).send("Transaction Created Successfully!")
})

router.get('/transaction', async (req, res) => {
   const alltransactions = await Transaction.find().populate('userId', 'name');
   res.status(200).send(alltransactions)
})

router.put('/transaction/:id', async (req, res) => {
   const transaction = await Transaction.findById(req.params.id)

   transaction.userId = req.body.userId || transaction.userId
   transaction.amount = req.body.amount || transaction.amount
   transaction.mode = req.body.mode || transaction.mode
   transaction.transactionId = req.body.transactionId || transaction.transactionId
   transaction.created_at = req.body.created_at || transaction.created_at
   transaction.updated_at = req.body.updated_at || transaction.updated_at
   transaction.status = req.body.status || transaction.status

   await transaction.save()
   res.status(201).send("Transaction Updated Successfully!")
})
router.get('/transaction/user/:id', async (req, res) => {
   try {
      const { userId } = req.params.id;
      if (!userId) {
         return res.status(400).json({ message: "User ID is required!" });
      }

      const transactions = await Transaction.find({ userId }).populate('userId', 'name');
      if (transactions.length === 0) {
         return res.status(404).json({ message: "No transactions found for this user." });
      }

      res.status(200).json(transactions);

   } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error });
   }


})

router.delete('/transaction/:id', async (req, res) => {
   await Transaction.findByIdAndDelete(req.params.id)
   res.status(200).send("Transaction Deleted Successfully")
})
module.exports = router