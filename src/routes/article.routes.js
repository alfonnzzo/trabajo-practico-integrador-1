import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getByIdArticle,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js"

const articleRoutes = Router();

articleRoutes.post("/", createArticle);
articleRoutes.get("/", getAllArticles);
articleRoutes.put("/:id", updateArticle)
articleRoutes.get("/:id", getByIdArticle)
articleRoutes.delete("/:id", deleteArticle)

export default articleRoutes;