import Tag from "../models/tag.model.js";
import Article from "../models/article.model.js";

//  Crear Tag
export const createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Listar todos los Tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    if (tags.length === 0)
      return res.status(404).json({ message: "No existen etiquetas" });
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Buscar Tag por ID (con artículos relacionados)
export const getByPkTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id, {
      include: {
        model: Article,
        as: "articles",
        through: { attributes: [] }, // evita mostrar la tabla pivote
      },
    });
    if (!tag) return res.status(404).json({ message: "La etiqueta no existe" });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Actualizar Tag
export const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "El Tag no existe" });

    await tag.update(req.body);

    return res.status(200).json({ message: "Etiqueta actualizada", tag });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Eliminar Tag
export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Tag.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "La etiqueta no existe" });
    return res
      .status(200)
      .json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};