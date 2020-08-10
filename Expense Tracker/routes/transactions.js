<<<<<<< HEAD
const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.get('/', transactionsController.getTransactions);

router.post('/', transactionsController.addTransaction);

router.delete('/:id', transactionsController.deleteTransaction);

=======
const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.get('/', transactionsController.getTransactions);

router.post('/', transactionsController.addTransaction);

router.delete('/:id', transactionsController.deleteTransaction);

>>>>>>> bd0aecbdd706fea54dfaf256089fe9050ec5ec88
module.exports = router;