import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
// linux ou mac
// const upload = multer({ dest: "./uploads" })

const routes = (app) => {
    // Configura o middleware para permitir que a aplicação receba dados no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    // Chama a função controlador para processamento da imagem
    app.post("/upload", upload.single("imagem"), uploadImagem)
    // 
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;
