const { sequelize, Producto, Venta, DetalleVenta } = require('../models/index');

/**
 * - Sin parametros: devuelve TODOS los productos
 * - Con parametros (?page=1&limit=10): devuelve solo esa pagina de resultados,junto con un objeto "pagination"
 *  indicando la pagina actual, limite, total de resultados y total de paginas.
 *  Ej: GET /api/products?page=2&limit=8 -> productos 9 a 16
 */
exports.getProductosActivos = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if (!page && !limit) {
            const productos = await Producto.findAll({ where: { activo: true } });
            return res.status(200).json({ status: "success", data: productos });
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const offset = (pageNum - 1) * limitNum;

        const { count, rows } = await Producto.findAndCountAll({
            where: { activo: true },
            limit: limitNum,
            offset
        });

        return res.status(200).json({
            status: "success",
            data: rows,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: count,
                totalPages: Math.ceil(count / limitNum)
            }
        });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};

exports.getProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findOne({
            where: {
                id,
                activo: true
            }
        });

        if (!producto) {
            return res.status(404).json({
                status: "error",
                mensaje: "Producto no encontrado."
            });
        }

        return res.status(200).json({
            status: "success",
            data: producto
        });
    } catch (e) {
        return res.status(500).json({
            status: "error",
            mensaje: e.message
        });
    }
};

exports.confirmarCompra = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { 
            nombreCliente, items } = req.body; // expects: [{ id, cantidad }]

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

exports.getVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({ include: Producto });
        return res.status(200).json({ status: "success", data: ventas });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};