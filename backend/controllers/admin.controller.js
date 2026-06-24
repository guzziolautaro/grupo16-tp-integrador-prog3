exports.getDashboard = async (req, res) => {
    try {
        res.render('dashboard');
    } catch (e) {
        res.status(500).send("Error de base de datos.");
    }
};