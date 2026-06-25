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

exports.postToggleProduct = async (req, res) => {
    try {
        const prod = await Producto.findByPk(req.params.id);
        if (prod) {
            prod.activo = !prod.activo;
            await prod.save();
        }
        res.redirect('/admin/dashboard');
    } catch (e) {
        res.status(500).send("Error: " + e.message);
    }
};

exports.postToggleProduct = async (req, res) => {
    try {
        const prod = await Producto.findByPk(req.params.id);
        if (prod) {
            prod.activo = !prod.activo;
            await prod.save();
        }
        return res.status(200).json({ status: "success", mensaje: "Estado cambiado" });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};

exports.postDeleteProduct = async (req, res) => {
    try {
        const prod = await Producto.findByPk(req.params.id);
        if (prod) {
            await prod.destroy();
        }
        return res.status(200).json({ status: "success", mensaje: "Producto borrado" });
    } catch (e) {
        return res.status(500).json({ status: "error", mensaje: e.message });
    }
};

exports.postEditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, precio } = req.body;
        const prod = await Producto.findByPk(id);

        if (!prod) {
            return res.status(404).json({ status: "error", mensaje: "Product not found" });
        }

        prod.nombre = nombre;
        prod.categoria = categoria;
        prod.precio = parseFloat(precio);

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const fullNewName = req.file.filename + ext;
            
            fs.renameSync(
                req.file.path,
                path.join(req.file.destination, fullNewName)
            );
            
            prod.imagen = `/uploads/${fullNewName}`;
        }

        await prod.save();
        return res.status(200).json({ status: "success", mensaje: "Product modified successfully." });
    } catch (error) {
        return res.status(500).json({ status: "error", mensaje: error.message });
    }
};