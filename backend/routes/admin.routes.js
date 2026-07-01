const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validateProductMiddleware = require('../middlewares/validateProduct.middleware');

router.get('/login', adminController.getLoginView);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.logout);
router.post('/new', adminController.createAdmin); // moved above auth if it should be public

router.use(authMiddleware);

router.get('/dashboard', adminController.getDashboard);
router.post('/product/new', uploadMiddleware, validateProductMiddleware, adminController.postAddProduct);
router.post('/upload/:id', uploadMiddleware, adminController.postUploadImage);
router.delete('/product/delete/:id', adminController.postDeleteProduct);
router.put('/product/toggle/:id', adminController.postToggleProduct);
router.put('/product/edit/:id', uploadMiddleware, validateProductMiddleware, adminController.postEditProduct);
router.get('/ventas', adminController.getVentasView);
router.get('/registros', adminController.getRegistrosView);
router.get('/registros/excel', adminController.descargarRegistrosExcel);

module.exports = router;