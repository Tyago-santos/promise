import multer from "multer";

// Mantem o arquivo em memoria: quem persiste e o Supabase Storage, via lib/storage.
const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("Formato de imagem não suportado"));
      return;
    }
    cb(null, true);
  },
});
