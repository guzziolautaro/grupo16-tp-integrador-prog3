const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/products', apiController.getProductosActivos);
router.get('/products/image/:id', apiController.getProductImage);

router.post('/compra', apiController.confirmarCompra);

module.exports = router;