const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/productos', apiController.getProductosActivos);
router.post('/compra', apiController.confirmarCompra);

module.exports = router;