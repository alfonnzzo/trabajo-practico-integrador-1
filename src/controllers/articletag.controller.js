import Article from "../models/articletag.model.js";
import Tag from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) return res.status(404).json({ message: "El artículo no existe" });

    const tag = await Tag.findByPk(tagId);
    if (!tag) return res.status(404).json({ message: "La etiqueta no existe" });

    await article.addTag(tag);

    return res.status(200).json({ message: "Etiqueta asignada correctamente al artículo" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) return res.status(404).json({ message: "El artículo no existe" });

    const tag = await Tag.findByPk(tagId);
    if (!tag) return res.status(404).json({ message: "La etiqueta no existe" });

    await article.removeTag(tag);

    return res.status(200).json({ message: "Etiqueta eliminada del artículo correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};