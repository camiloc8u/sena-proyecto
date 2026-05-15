import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Configuración de Mercado Pago (Credenciales de image_7988d0.png)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// 2. Conexión a la base de datos "gym"
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "gym",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- RUTA: LOGIN ---
app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo = ? AND password = ?",
      [correo, password]
    );
    if (rows.length > 0) {
      const usuario = rows[0];
      delete usuario.password;
      res.status(200).json({ exito: true, usuario });
    } else {
      res.status(401).json({ exito: false, mensaje: "Correo o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error en servidor:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno" });
  }
});

// --- RUTA: CREAR PREFERENCIA (CORREGIDA PARA image_792070.png) ---
app.post("/api/create-preference", async (req, res) => {
  try {
    const { items, payer } = req.body; // Recibe de tu Checkout.jsx

    const preference = new Preference(client);

    // Mapeo exacto de lo que envía tu Front
    const itemsMercadoPago = items.map(item => ({
      id: String(item.id),
      title: item.name, // Coincide con Checkout.jsx
      quantity: Number(item.quantity),
      unit_price: Number(item.price), // Coincide con Checkout.jsx
      currency_id: 'COP'
    }));

    const result = await preference.create({
      body: {
        items: itemsMercadoPago,
        payer: {
          name: payer.fullName,
          email: payer.email,
          phone: { number: payer.phone },
          identification: {
            type: payer.idType,
            number: payer.idNumber
          }
        },
        // Aquí estaba el error. Debe estar DENTRO de body y ser plural.
        back_urls: {
          success: "http://localhost:5173",
          failure: "http://localhost:5173",
          pending: "http://localhost:5173"
        },
        auto_return: "approved",
      }
    });

    // Enviamos urlDePago para el redireccionamiento
    res.json({ 
      id: result.id, 
      urlDePago: result.init_point 
    });

  } catch (error) {
    console.error("Error Mercado Pago:", error);
    res.status(500).json({ 
      exito: false, 
      mensaje: "No se pudo generar el pago",
      detalles: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor de Gymzone corriendo en http://localhost:${PORT}`);
});