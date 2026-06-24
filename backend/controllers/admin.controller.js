const { Producto } = require('../models/index');

exports.getDashboard = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.render('dashboard', { productos });
    } catch (e) {
        res.status(500).send("Error de base de datos.");
    }
};

exports.postAddProduct = async (req, res) => {
    try {
        const { nombre, categoria, precio } = req.body;
        const imagenPath = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg';

        await Producto.create({
            nombre,
            categoria,
            precio: parseFloat(precio),
            imagen: imagenPath,
            activo: true
        });
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send(error.message);
    }
};