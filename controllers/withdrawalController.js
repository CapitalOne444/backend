const Withdarwal = require('../modals/Withdrawal');

exports.getUserWithdrawal = async (req, res) => {
    try {
        const { userId } = req.params;

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
};
