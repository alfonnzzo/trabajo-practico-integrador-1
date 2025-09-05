import { connectDB } from "./src/config/database.js"; // ojo que necesitamos sequelize
import sequelize  from "./src/config/database.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Rutas
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import articleTagRoutes from "./src/routes/articletag.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";

// Relaciones
import "./src/models/associations.js"; // donde definís User↔Profile y Article↔Tag

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/tags", tagRoutes);
app.use("/articles", articleRoutes);
app.use("/", articleTagRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // conecta a MySQL
    // Sincronizar todas las tablas
    await sequelize.sync({ force: false }); // force: true si querés borrar y crear todo desde cero
    console.log("✅ Todas las tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
