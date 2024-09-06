const express = require('express');
const router = express.Router();
const Report = require('../models/reports'); // Assuming the schema is in the models folder


// Create a new report
router.post('/', async (req, res) => {
    try {
        const report = new Report(req.body);
        await report.save();
        res.status(201).send(report);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific report by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const report = await Report.findById(_id);
        if (!report) {
            return res.status(404).send();
        }
        res.status(200).send(report);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a report by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'code','donem','finansal_durum_tablosu', 'sunum_para_birimi', 'finansal_tablo_niteliği',
        'dönen_varlıklar', 'duran_varlıklar', 'toplam_varlıklar', 
        'kısa_vadeli_yükümlülükler', 'uzun_vadeli_yükümlülükler', 
        'toplam_yükümlülükler', 'ana_ortaklığa_ait_özkaynaklar', 'ödenmiş_sermaye',
        'kontrol_gücü_olmayan_paylar', 'toplam_özkaynaklar', 'toplam_kaynaklar',
        'kar_veya_zarar_ve_diğer_kapsamli_gelir_tablosu', 'hasılat', 'satışların_maliyeti',
        'ticari_faaliyetlerden_brüt_kar', 'finans_sektörü_faaliyetleri_hasılatı',
        'finans_sektörü_faaliyetleri_maliyeti', 'finans_sektörü_faaliyetlerinden_brüt_kâr',
        'brüt_kâr', 'esas_faaliyet_kârı', 'finansman_geliri_öncesi_faaliyet_kârı',
        'sürdürülen_faaliyetler_vergi_öncesi_kârı', 'sürdürülen_faaliyetler_dönem_kârı',
        'durdurulan_faaliyetler_dönem_kârı', 'net_dönem_kârı', 
        'dönem_kârının_dağılımı_kontrol_gücü_olmayan_paylar', 'dönem_kârının_dağılımı_ana_ortaklık_payları', 
        'diğer_kapsamlı_gelir', 'toplam_kapsamlı_gelir', 
        'toplam_kapsamlı_gelirin_dağılımı_kontrol_gücü_olmayan_paylar', 
        'toplam_kapsamlı_gelirin_dağılımı_ana_ortaklık_payları'
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!report) {
            return res.status(404).send();
        }
        res.status(200).send(report);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a report by ID
router.delete('/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).send();
        }
        res.status(200).send(report);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
