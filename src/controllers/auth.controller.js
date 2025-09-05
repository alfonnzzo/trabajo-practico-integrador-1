import User from "../models/user.model.js";
import Profile  from "../models/profile.model.js"; 
import { Op } from "sequelize";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";

// 📌 POST /api/auth/register
export const register = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    // validar email y username únicos
    const existing = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existing) {
      return res.status(400).json({
        msg: "Email o Username ya están en uso",
      });
    }

    // hashear password
    const hashed = await hashPassword(password);

    // crear usuario
    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    // crear perfil automáticamente
    await Profile.create({
      user_id: user.id,
      first_name,
      last_name,
    });

    return res.status(201).json({
      msg: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({
      msg: "Error interno del servidor",
      message: error.message,
    });
  }
};

// 📌 POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Profile, as: "profile" },
    });

    if (!user) {
      return res.status(404).json({ msg: "Credenciales incorrectas" });
    }

    // comparar password
    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciales incorrectas" });
    }

     // generar token
    const token = signToken({ id: user.id, role: user.role });

     // guardar token en cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({
      msg: "Logueado correctamente",
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: "Error interno del servidor" , message: error.message});
  }
};

// 📌 GET /api/auth/profile
export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "role"],
      include: { model: Profile, as: "profile" },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error en profile:", error);
    res.status(500).json({ msg: "Error interno del servidor" , message: error.message});
  }
};

// 📌 PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });

    if (!profile) {
      return res.status(404).json({ msg: "Perfil no encontrado" });
    }

    await profile.update({
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    });

    return res.status(200).json({
      msg: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.error("Error en updateProfile:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// 📌 POST /api/auth/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      msg: "Logout exitoso, cookie eliminada",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};