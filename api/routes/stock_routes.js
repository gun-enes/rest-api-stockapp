const express = require('express');
const router = express.Router();
const Stock = require('../models/stocks'); // Adjust the path as needed

// Create a new stock entry
router.post('/', async (req, res) => {
    try {
        const stock = new Stock({
            code: req.body.code,
            title: req.body.title,
            date: req.body.date || undefined, // Will default to today if not provided
            price: req.body.price,
            change: req.body.change
        });
        const savedStock = await stock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all stock entries
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific stock by ID
router.get('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a specific stock by ID
router.patch('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        if (req.body.code !== undefined) stock.code = req.body.code;
        if (req.body.title !== undefined) stock.title = req.body.title;
        if (req.body.date !== undefined) stock.date = req.body.date;
        if (req.body.price !== undefined) stock.price = req.body.price;
        if (req.body.change !== undefined) stock.change = req.body.change;

        const updatedStock = await stock.save();
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a specific stock by ID
router.delete('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        await stock.remove();
        res.json({ message: 'Stock deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
