const express = require('express');
const router = express.Router();
const Records = require('../models/records'); // Ensure the correct path to your Records model

// Route to get all records
router.get('/', async (req, res) => {
    try {
        const records = await Records.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:code', async (req, res) => {
    try {
        const records = await Records.find({ code: req.params.code });
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/search', async (req, res) => {
    const { code, date } = req.query; // Assuming date is provided as a query parameter
    try {
        const record = await Records.findOne({ 
            code: code, 
            date: new Date(date) 
        });
        
        if (!record) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to create a new record entry
router.post('/', async (req, res) => {
    const record = new Records({
        code: req.body.code,
        price: req.body.price,
        date: req.body.date
    });

    try {
        const newStock = await record.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update an existing record entry
router.patch('/:id', async (req, res) => {
    try {
        const record = await Records.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Stock not found' });

        if (req.body.code) record.code = req.body.code;
        if (req.body.price) record.price = req.body.price;
        if (req.body.date) record.date = req.body.date;

        const updatedStock = await record.save();
        res.status(200).json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a record entry
router.delete('/:id', async (req, res) => {
    try {
        const record = await Records.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Stock not found' });

        await record.remove();
        res.status(200).json({ message: 'Stock deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
