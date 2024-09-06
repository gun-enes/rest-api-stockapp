const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reportSchema = new Schema({
    code: {
        type: String
    },
    donem: {
        type: String
    },
    sunum_para_birimi: {
        type: String, 
    },
    finansal_tablo_niteliği: {
        type: String, 
    },
    dönen_varlıklar: {
        type: Number, 
    },
    duran_varlıklar: {
        type: Number, 
    },
    toplam_varlıklar: {
        type: Number, 
    },
    kısa_vadeli_yükümlülükler: {
        type: Number, 
    },
    uzun_vadeli_yükümlülükler: {
        type: Number, 
    },
    toplam_yükümlülükler: {
        type: Number, 
    },
    ana_ortaklığa_ait_özkaynaklar: {
        type: Number, 
    },
    ödenmiş_sermaye: {
        type: Number, 
    },
    kontrol_gücü_olmayan_paylar: {
        type: Number, 
    },
    toplam_özkaynaklar: {
        type: Number, 
    },
    toplam_kaynaklar: {
        type: Number, 
    },
    hasılat: {
        type: Number, 
    },
    satışların_maliyeti: {
        type: Number, 
    },
    ticari_faaliyetlerden_brüt_kar: {
        type: Number, 
    },
    finans_sektörü_faaliyetleri_hasılatı: {
        type: Number, 
    },
    finans_sektörü_faaliyetleri_maliyeti: {
        type: Number, 
    },
    finans_sektörü_faaliyetlerinden_brüt_kâr: {
        type: Number, 
    },
    brüt_kâr: {
        type: Number, 
    },
    esas_faaliyet_kârı: {
        type: Number, 
    },
    finansman_geliri_öncesi_faaliyet_kârı: {
        type: Number, 
    },
    sürdürülen_faaliyetler_vergi_öncesi_kârı: {
        type: Number, 
    },
    sürdürülen_faaliyetler_dönem_kârı: {
        type: Number, 
    },
    durdurulan_faaliyetler_dönem_kârı: {
        type: Number, 
    },
    net_dönem_kârı: {
        type: Number, 
    },
    dönem_kârının_dağılımı_kontrol_gücü_olmayan_paylar: {
        type: Number, 
    },
    dönem_kârının_dağılımı_ana_ortaklık_payları: {
        type: Number, 
    },
    diğer_kapsamlı_gelir: {
        type: Number, 
    },
    toplam_kapsamlı_gelir: {
        type: Number, 
    },
    toplam_kapsamlı_gelirin_dağılımı_kontrol_gücü_olmayan_paylar: {
        type: Number, 
    },
    toplam_kapsamlı_gelirin_dağılımı_ana_ortaklık_payları: {
        type: Number, 
    },
});

module.exports = mongoose.model('report', reportSchema);
