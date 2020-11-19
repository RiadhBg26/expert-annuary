const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, next) {
        next(null, 'uploads');
    },
    filename: function(req, file, next) {
        next(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

const upload = multer({ storage : storage});

module.exports = upload