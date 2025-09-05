import Article from "../models/article.model.js";
import Profile from "../models/profile.model.js";
import Tag from "../models/tag.model.js";

// Crear artículo
export const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Listar todos los artículos
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    if (!articles.length) return res.status(404).json({ message: "No existen artículos" });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar artículo por ID
export const getByIdArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ message: "El artículo no existe" });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar artículo
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ message: "El artículo no existe" });

    await article.update(req.body);
    return res.status(200).json({ message: "Artículo actualizado correctamente", article });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar artículo
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Article.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "El artículo no existe" });
    return res.status(200).json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
