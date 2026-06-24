const { sequelize, Producto, Venta, DetalleVenta } = require('../models/index');

exports.getProductosActivos = async (req, res) => {
    try {
        const productos = await Producto.findAll({ where: { activo: true } });
        return res.status(200).json({ status: "success", data: productos });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};