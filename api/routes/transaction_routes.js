const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactions'); // Adjust the path as needed

// GET all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single transaction by ID
router.get('/:id', async (req, res) => {
    try {1
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        price: req.body.price,
        bist: req.body.bist,
        dollar: req.body.dollar
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a transaction by ID
router.put('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.title = req.body.title;
        transaction.amount = req.body.amount;
        transaction.date = req.body.date;
        transaction.price = req.body.price;
        transaction.bist = req.body.bist;
        transaction.dollar = req.body.dollar;

        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a transaction by ID
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.deleteOne();
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
