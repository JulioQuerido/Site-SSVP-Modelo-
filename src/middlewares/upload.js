const fs = require('fs');
const path = require('path');
const multer = require('multer');

const maxSizeMb = Number(process.env.MAX_FILE_SIZE_MB || 10);
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function fileFilter(req, file, cb) {
  const isPdfMime = file.mimetype === 'application/pdf';
  const isPdfExt = path.extname(file.originalname).toLowerCase() === '.pdf';
  if (!isPdfMime || !isPdfExt) {
    return cb(new Error('Apenas arquivos PDF são permitidos.'));
  }
  cb(null, true);
}

function buildFilename(originalname) {
  const ext = path.extname(originalname).toLowerCase();
  const base = path
    .basename(originalname, ext)
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .slice(0, 60);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${base}-${uniqueSuffix}${ext}`;
}

let multerInstance;
let setupError = null;

if (useBlob) {
  multerInstance = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
  });
} else {
  try {
    const uploadPath = process.env.UPLOAD_PATH || './public/uploads';
    const resolvedUploadPath = path.isAbsolute(uploadPath) ? uploadPath : path.join(process.cwd(), uploadPath);

    if (!fs.existsSync(resolvedUploadPath)) {
      fs.mkdirSync(resolvedUploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, resolvedUploadPath),
      filename: (req, file, cb) => cb(null, buildFilename(file.originalname)),
    });

    multerInstance = multer({
      storage,
      fileFilter,
      limits: { fileSize: maxSizeMb * 1024 * 1024 },
    });
  } catch (err) {
    // Sistema de arquivos somente leitura (ex: serverless sem BLOB_READ_WRITE_TOKEN
    // configurado). Não derruba o boot do app; falha apenas quando um upload é tentado.
    console.error('[upload] Falha ao preparar armazenamento em disco:', err.message);
    setupError = err;
    multerInstance = multer({ storage: multer.memoryStorage() });
  }
}

async function toBlob(file) {
  const { put } = require('@vercel/blob');
  const filename = buildFilename(file.originalname);
  const blob = await put(`documentos/${filename}`, file.buffer, {
    access: 'public',
    contentType: 'application/pdf',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

async function attachUrls(req, res, next) {
  try {
    if (setupError && (req.file || req.files)) {
      throw new Error(
        'Armazenamento de uploads indisponível neste ambiente. Configure BLOB_READ_WRITE_TOKEN.'
      );
    }
    if (req.file) {
      req.file.url = useBlob ? await toBlob(req.file) : `/uploads/${req.file.filename}`;
    }
    if (req.files) {
      for (const field of Object.keys(req.files)) {
        for (const file of req.files[field]) {
          file.url = useBlob ? await toBlob(file) : `/uploads/${file.filename}`;
        }
      }
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  single: (fieldName) => [multerInstance.single(fieldName), attachUrls],
  fields: (fieldsSpec) => [multerInstance.fields(fieldsSpec), attachUrls],
  usingBlob: useBlob,
};
