exports.getProductosActivos = (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            data: { id: 1, nombre: "sas", categoria: "producto", precio: 999, imagen: "foo.jpg", activo: true }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los productos de la tienda"
        });
    }
};