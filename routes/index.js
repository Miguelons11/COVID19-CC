const express = require('express');
const router = express.Router();
const controlador = require('../controllers/controller');

// Locations 
router.get('/covid/:locationid', controlador.readOne);
router.get('/covid/country/:country', controlador.readCountry);
router.get('/covid/confirmed/:country', controlador.readCountryConfirmed);
router.get('/covid/recovered/:country', controlador.readCountryRecovered);
router.get('/covid/death/:country', controlador.readCountryDeath);
router.get('/covid/summary/:country', controlador.readSummaryCountry);
router.get('/covidsummary/summaryGlobal', controlador.readGlobalSummary);
router.get('/covid/global/deaths', controlador.readGlobalDeaths);
router.get('/covid/global/recovered', controlador.readGlobalRecovered);
router.get('/covid/global/confirmed', controlador.readGlobalConfirmed);





module.exports = router;
