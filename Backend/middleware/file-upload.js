const multer = require('multer');
const { v1: uuidv1 } = require('uuid');


const MIME_TPYE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb)=>{
      const ext = MIME_TPYE_MAP[file.mimetype];
      cb(null, uuidv1() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TPYE_MAP[file.mimetype];   // undefined <-> false   otherwise true
    let error = isValid ? null: new Error('Invalid mime type');
    cb(error, isValid);
  }
});

module.exports=fileUpload;