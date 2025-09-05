import { Router } from "express";
import {
    createTag,
    getByIdTag,
    getAllTags,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js"

const tagRoutes = Router();
tagRoutes.post("/", createTag);
tagRoutes.get("/", getAllTags);
tagRoutes.put("/:id", updateTag);
tagRoutes.get("/:id", getByIdTag)
tagRoutes.delete("/:id", deleteTag);

export default tagRoutes;

