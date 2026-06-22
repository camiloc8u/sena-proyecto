import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "gym",
  waitForConnections: true,
  connectionLimit: 10
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ? AND password = ?", [correo, password]);
    if (rows.length > 0) res.status(200).json({ exito: true, usuario: rows[0] });
    else res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
  } catch (error) { res.status(500).json({ mensaje: "Error servidor" }); }
});

// post usuario
app.post("/api/usuarios", async (req, res) => {
  const { primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password } = req.body;
  console.log("Recibiendo datos:", req.body); 
  try {
    const [result] = await pool.query(
      "INSERT INTO usuario (primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password]
    );
    res.status(201).json({ idusuario: result.insertId, ...req.body });
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: error.message });
  }
});

// put usuario
app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password } = req.body;
  try {
    await pool.query(
      "UPDATE usuario SET primer_nombre = ?, primer_apellido = ?, num_doc = ?, rol = ?, estado_cuenta = ?, correo = ?, password = ? WHERE idusuario = ?",
      [primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password, id]
    );
    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/usuarios", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuario");
  res.json(rows);
});

app.listen(3001, () => console.log("Servidor en puerto 3001"));