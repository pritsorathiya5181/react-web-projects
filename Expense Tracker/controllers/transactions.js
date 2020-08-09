const Transaction = require('../models/Transaction');

exports.getTransactions = (req, res, next) => {
    Transaction.find()
        .then(transactions => {
            return res.status(200).json({
                success: true,
                count: transactions.length,
                data: transactions
            });
        })
        .then(result => {
            console.log('Fetched successfully');
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
        })
}

exports.addTransaction = (req, res, next) => {
    const { text, amount } = req.body;

    Transaction.create(req.body)
        .then(transaction => {
            return res.status(201).json({
                success: true,
                data: transaction
            });
        })
        .then(result => {
            console.log('Added successfully');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                const messages = Object.values(err.errors).map(val => val.message);

                return res.status(400).json({
                    success: false,
                    error: messages
                })
            } else {
                return res.status(500).json({
                    success: false,
                    error: err
                })
            }
        })
}

exports.deleteTransaction = (req, res, next) => {
    const traId = req.params.id;
    // console.log(traId)
    Transaction.findById(traId)
        .then(transaction => {
            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    error: 'No Transaction found'
                });
            }
            return transaction.remove()
                .then(result => {
                    return res.status(200).json({
                        success: true,
                        data: {}
                    })
                })
                .then(result => {
                    console.log('Deleted successfully');
                })
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
        })
}