const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const uniqueName = `prod-${Date.now()}${extension}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload.single('image');