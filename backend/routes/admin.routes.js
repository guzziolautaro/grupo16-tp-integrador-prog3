const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validateProductMiddleware = require('../middlewares/validateProduct.middleware');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 

router.get('/login', adminController.getLoginView);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.logout);

router.use(authMiddleware);

router.get('/dashboard', adminController.getDashboard);
router.post('/product/new',uploadMiddleware, adminController.postAddProduct);

router.post('/upload/:id', uploadMiddleware, adminController.postUploadImage);

router.delete('/product/delete/:id', adminController.postDeleteProduct);

router.use(validateProductMiddleware);

router.put('/product/toggle/:id', adminController.postToggleProduct);
router.put('/product/edit/:id', uploadMiddleware, adminController.postEditProduct);

module.exports = router;