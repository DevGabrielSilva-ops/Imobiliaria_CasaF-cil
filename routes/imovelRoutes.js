// routes/imovelRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const imovelController = require("../controllers/imovelController");

const router = express.Router();

// configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Tipo de arquivo inválido"));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } });

// Rotas
router.get("/", imovelController.listar);
router.post("/add", upload.single("imagem"), imovelController.criar);
router.get("/delete/:id", imovelController.remover);

module.exports = router;
