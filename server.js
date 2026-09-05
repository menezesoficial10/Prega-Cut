const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
    dest: "uploads/"
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        app: "PREGA.CUT",
        status: "online",
        ai: process.env.OPENAI_API_KEY ? "configured" : "not_configured"
    });
});

app.post("/api/upload", upload.single("video"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Nenhum vídeo enviado."
        });
    }

    res.json({
        success: true,
        message: "Vídeo recebido.",
        file: req.file.filename
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`PREGA.CUT rodando na porta ${PORT}`);
});
