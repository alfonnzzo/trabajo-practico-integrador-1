import User from "../models/user.model.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("createUser :: error al crear el usuario:", error);
    return res.status(500).json({ error: "Error interno al crear usuario" , msg: error });
  }
};

// Listar todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("getAllUsers :: error al listar usuarios:", error);
    return res.status(500).json({ error: "Error interno al listar usuarios" });
  }
};


// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("getUserById :: error al obtener usuario:", error);
    return res.status(500).json({ error: "Error interno al obtener usuario" });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.update(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error("updateUser :: error al actualizar usuario:", error);
    return res.status(500).json({ error: "Error interno al actualizar usuario" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.destroy();
    return res.status(204).send(); // No retorna body, solo status
  } catch (error) {
    console.error("deleteUser :: error al eliminar usuario:", error);
    return res.status(500).json({ error: "Error interno al eliminar usuario" });
  }
};
