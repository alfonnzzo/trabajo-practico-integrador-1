import { Router } from "express";
import {
 register, 
 login, 
 profile, 
 updateProfile, 
 logout
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.get("/profile", profile);

authRoutes.put("/register", updateProfile);

authRoutes.post("/logout", logout);

// rutas publica

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;