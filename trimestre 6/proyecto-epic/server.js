import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

// Inicializar la aplicación Express y sus middlewares
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

// Almacén temporal en memoria para los códigos de recuperación
const codigosRecuperacion = {};

// Login (POST)
app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ? AND password = ?", [correo, password]);
    if (rows.length > 0) {
      res.status(200).json({ exito: true, usuario: rows[0] });
    } else {
      res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
    }
  } catch (error) { 
    res.status(500).json({ error: "Error en el servidor", detalle: error.message }); 
  }
});

// --- RUTAS DE RECUPERACIÓN DE CONTRASEÑA ---

// 1. Solicitar código de recuperación
app.post("/api/recuperar-password", async (req, res) => {
  const { correo } = req.body;

  try {
    if (!correo) {
      return res.status(400).json({ exito: false, mensaje: "El correo es obligatorio." });
    }

    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
    
    if (rows.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Este correo no está registrado en el sistema." });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    
    codigosRecuperacion[correo] = { 
      codigo, 
      expira: Date.now() + 15 * 60 * 1000 
    };

    console.log(`\n====================================================`);
    console.log(`🔑 CÓDIGO DE RECUPERACIÓN PARA: ${correo}`);
    console.log(`📌 CÓDIGO DE VERIFICACIÓN: [ ${codigo} ]`);
    console.log(`====================================================\n`);

    res.json({ exito: true, mensaje: "Código generado con éxito." });
  } catch (error) {
    console.error("Error en recuperar-password:", error);
    res.status(500).json({ exito: false, mensaje: "Error en el servidor.", detalle: error.message });
  }
});

// 2. Verificar código y cambiar contraseña
app.post("/api/cambiar-password", async (req, res) => {
  const { correo, codigo, nuevaPassword } = req.body;
  const datosRecuperacion = codigosRecuperacion[correo];

  if (!datosRecuperacion || datosRecuperacion.codigo !== codigo) {
    return res.status(400).json({ exito: false, mensaje: "Código inválido o incorrecto." });
  }

  if (Date.now() > datosRecuperacion.expira) {
    delete codigosRecuperacion[correo];
    return res.status(400).json({ exito: false, mensaje: "El código ha expirado." });
  }

  try {
    const [userRows] = await pool.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
    if (userRows.length === 0) {
      return res.status(404).json({ exito: false, mensaje: "Usuario no encontrado." });
    }

    const [result] = await pool.query(
      "UPDATE usuario SET password = ? WHERE correo = ?", 
      [nuevaPassword, correo]
    );

    if (result.affectedRows > 0) {
      delete codigosRecuperacion[correo]; 
      res.json({ exito: true, mensaje: "Contraseña actualizada con éxito." });
    } else {
      res.status(404).json({ exito: false, mensaje: "No se pudo actualizar la contraseña." });
    }
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ exito: false, mensaje: "Error en la base de datos.", detalle: error.message });
  }
});

// ----------------------------------------------------
// GET usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuario");
    res.status(200).json(rows);
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: "Error al obtener usuarios", detalle: error.message });
  }
});

// GET usuario por ID
app.get("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM usuario WHERE idusuario = ?", [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: "Error al obtener el usuario", detalle: error.message });
  }
});

// POST crear usuario
app.post("/api/usuarios", async (req, res) => {
  const { primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO usuario (primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password]
    );
    res.status(201).json({ idusuario: result.insertId, ...req.body });
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: "Error al crear usuario", detalle: error.message });
  }
});

// ✨ PUT ACTUALIZAR USUARIO (ADMINISTRADOR) - CON PROTECCIÓN DE CONTRASEÑA ✨
app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password } = req.body;
  
  try {
    let sqlQuery = "";
    let params = [];

    // Si Flutter SÍ envía una contraseña nueva, la actualizamos
    if (password && password.trim() !== "") {
      sqlQuery = "UPDATE usuario SET primer_nombre = ?, primer_apellido = ?, num_doc = ?, rol = ?, estado_cuenta = ?, correo = ?, password = ? WHERE idusuario = ?";
      params = [primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, password, id];
    } 
    // Si Flutter NO envía contraseña (ej. al cambiar a Inactivo), no la tocamos en MySQL
    else {
      sqlQuery = "UPDATE usuario SET primer_nombre = ?, primer_apellido = ?, num_doc = ?, rol = ?, estado_cuenta = ?, correo = ? WHERE idusuario = ?";
      params = [primer_nombre, primer_apellido, num_doc, rol, estado_cuenta, correo, id];
    }

    const [result] = await pool.query(sqlQuery, params);
    
    if (result.affectedRows > 0) {
      res.json({ mensaje: "Usuario actualizado con éxito", idusuario: id });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado para actualizar" });
    }
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: "Error al actualizar usuario", detalle: error.message });
  }
});

// ✨ NUEVO: PUT ACTUALIZAR PERFIL (CLIENTE) ✨
app.put('/api/usuario/:id', async (req, res) => {
  const { id } = req.params;
  const { primer_nombre, primer_apellido, correo, telefono, plan_actual } = req.body;

  try {
    const query = `
      UPDATE usuario 
      SET primer_nombre = ?, primer_apellido = ?, correo = ?, telefono = ?, plan_actual = ? 
      WHERE idusuario = ?
    `;
    const [result] = await pool.query(query, [primer_nombre, primer_apellido, correo, telefono, plan_actual, id]);
    
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Perfil actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("ERROR SQL al actualizar perfil:", error);
    res.status(500).json({ error: "Error al actualizar la base de datos", detalle: error.message });
  }
});

// DELETE usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0;");
    const [result] = await pool.query("DELETE FROM usuario WHERE idusuario = ?", [id]);
    await pool.query("SET FOREIGN_KEY_CHECKS = 1;");
    
    if (result.affectedRows > 0) {
      res.json({ mensaje: `Usuario con ID ${id} eliminado` });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH actualizar parcialmente
app.patch("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const camposAActualizar = req.body; 

  if (Object.keys(camposAActualizar).length === 0) {
    return res.status(400).json({ mensaje: "No se proporcionaron campos para actualizar" });
  }

  try {
    const llaves = Object.keys(camposAActualizar).map(key => `${key} = ?`);
    const valores = Object.values(camposAActualizar);
    valores.push(id);
    const sqlQuery = `UPDATE usuario SET ${llaves.join(", ")} WHERE idusuario = ?`;
    const [result] = await pool.query(sqlQuery, valores);

    if (result.affectedRows > 0) {
      res.json({ 
        mensaje: "Usuario actualizado parcialmente con éxito", 
        campos_modificados: camposAActualizar 
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("ERROR SQL:", error);
    res.status(500).json({ error: "Error al actualizar (PATCH)", detalle: error.message });
  }
});

// Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

app.post("/api/create-preference", async (req, res) => {
  try {
    const { items } = req.body; 

    // Ajustado para leer los datos que Flutter envía (title, unit_price, quantity)
    const itemsFormateados = items.map((item) => ({
      id: item.id,
      title: item.title || item.name, 
      quantity: Number(item.quantity || item.qty),
      unit_price: Number(item.unit_price || item.price),
      currency_id: "COP",
    }));

    const body = {
      items: itemsFormateados,
      back_urls: {
        success: "http://localhost:5173", 
        failure: "http://localhost:5173",
        pending: "http://localhost:5173",
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    
    res.json({ id: result.id, urlDePago: result.init_point }); 
  } catch (error) {
    console.error("Error detallado en Mercado Pago:", error);
    res.status(500).json({ error: "Error interno al crear la preferencia de pago" });
  }
});

// Iniciar servidor 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend corriendo con éxito en el puerto ${PORT}`);
});