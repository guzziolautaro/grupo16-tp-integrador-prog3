const { sequelize, Producto, Venta, DetalleVenta } = require('../models/index');
const path = require('path');
const fs = require('fs');

exports.getProductosActivos = async (req, res) => {
    try {
        const productos = await Producto.findAll({ where: { activo: true } });
        return res.status(200).json({ status: "success", data: productos });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};

exports.confirmarCompra = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { 
            ñnombreCliente, items } = req.body; // expects: [{ id, cantidad }]

        if (!nombreCliente || !items || items.length === 0) {
            await t.rollback();
            return res.status(400).json({ status: "error", mensaje: "Datos incompletos." });
        }

        let totalGeneral = 0;
        const itemsValidados = [];

        // loop and verify pricing against db registers
        for (const item of items) {
            const prod = await Producto.findByPk(item.id, { transaction: t });
            if (!prod || !prod.activo) {
                await t.rollback();
                return res.status(404).json({ status: "error", mensaje: `Producto ID ${item.id} no disponible.` });
            }
            const subtotal = prod.precio * item.cantidad;
            totalGeneral += subtotal;

            itemsValidados.push({ ProductoId: prod.id, cantidad: item.cantidad, precioUnitario: prod.precio, nombre: prod.nombre });
        }

        const nuevaVenta = await Venta.create({ nombreCliente, total: totalGeneral }, { transaction: t });

        const detalles = itemsValidados.map(item => ({
            VentaId: nuevaVenta.id,
            ProductoId: item.ProductoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario
        }));

        await DetalleVenta.bulkCreate(detalles, { transaction: t });
        await t.commit();

        return res.status(201).json({
            status: "success",
            ticket: {
                idTicket: `HP-${nuevaVenta.id.toString().padStart(5, '0')}`,
                nombreEmpresa: "HardwarePoint",
                nombreCliente: nuevaVenta.nombreCliente,
                fecha: new Date().toLocaleDateString('es-AR'),
                productos: itemsValidados,
                total: nuevaVenta.total
            }
        });
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ status: "error", mensaje: error.message });
    }
};

exports.getProductImage = async (req, res) => {
  try {
    const prod = await Producto.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ status: "error", mensaje: "Producto no encontrado" });

    const filename = path.basename(prod.imagen);
    const filePath = path.join(__dirname, '../public/uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ status: "error", mensaje: "Imagen no encontrada" });
    }

    res.sendFile(filePath);
  } catch (e) {
    res.status(500).json({ status: "error", mensaje: e.message });
  }
};