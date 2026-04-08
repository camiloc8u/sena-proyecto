create database gym;
use gym;
CREATE TABLE IF NOT EXISTS usuario (
  idusuario INT NOT NULL AUTO_INCREMENT,
  primer_nombre VARCHAR(45) NOT NULL,
  segundo_nombre VARCHAR(45) NULL DEFAULT NULL,
  primer_apellido VARCHAR(45) NOT NULL,
  segundo_apellido VARCHAR(45) NULL DEFAULT NULL,
  tipo_doc ENUM('CC', 'TI', 'CE', 'Pasaporte') NOT NULL,
  num_doc VARCHAR(20) NOT NULL,
  telefono VARCHAR(20) NULL DEFAULT NULL,
  correo VARCHAR(100) NOT NULL,
  password VARCHAR(255) NULL DEFAULT NULL,
  huella_biometrica VARBINARY(8000) NULL DEFAULT NULL,
  rol ENUM('Administrador', 'Entrenador', 'Cliente') NOT NULL,
  estado_cuenta ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (idusuario)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS sede (
  id_sede INT NOT NULL AUTO_INCREMENT,
  nombre_sede VARCHAR(45) NOT NULL,
  direccion_sede VARCHAR(100) NOT NULL,
  telefono_sede VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id_sede)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS planes (
  id_planes INT NOT NULL AUTO_INCREMENT,
  nombre_plan VARCHAR(45) NOT NULL,
  tipo_plan ENUM('Diario', 'Mensual', 'Semestral', 'Anual') NULL DEFAULT NULL,
  precio DECIMAL(10,2) NOT NULL,
  duracion_dias INT NULL DEFAULT NULL,
  descripcion TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id_planes)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS administrador (
  idadministrador INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  cambiar_stock VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (idadministrador),
  CONSTRAINT fk_admin_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (idusuario)
    ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS entrenador (
  id_entrenador INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  especialidad VARCHAR(45) NULL DEFAULT NULL,
  salario_hora DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (id_entrenador),
  CONSTRAINT fk_entrenador_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (idusuario)
    ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS cliente (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  fecha_registro DATE NULL DEFAULT NULL,
  entrenador_asignado INT NULL DEFAULT NULL,
  plan_actual INT NULL DEFAULT NULL,
  sede_id INT NULL DEFAULT NULL,
  fecha_vencimiento DATE NULL DEFAULT NULL,
  PRIMARY KEY (id_cliente),
  CONSTRAINT fk_cliente_entrenador
    FOREIGN KEY (entrenador_asignado) REFERENCES entrenador (id_entrenador),
  CONSTRAINT fk_cliente_planes
    FOREIGN KEY (plan_actual) REFERENCES planes (id_planes),
  CONSTRAINT fk_cliente_sede
    FOREIGN KEY (sede_id) REFERENCES sede (id_sede),
  CONSTRAINT fk_cliente_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (idusuario)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS asistencia (
  id_asistencia INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora_ingreso DATETIME NOT NULL,
  hora_salida DATETIME NULL DEFAULT NULL,
  total_horas_sesion DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (id_asistencia),
  CONSTRAINT fk_asistencia_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (idusuario)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS pagos (
  id_pagos INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_plan INT NULL DEFAULT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha_pago DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  metodo_pago ENUM('Efectivo', 'Tarjeta', 'Transferencia') NOT NULL,
  PRIMARY KEY (id_pagos),
  CONSTRAINT fk_pagos_cliente
    FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
  CONSTRAINT fk_pagos_plan
    FOREIGN KEY (id_plan) REFERENCES planes (id_planes)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT NOT NULL AUTO_INCREMENT,
  nombre_producto VARCHAR(45) NOT NULL,
  stock INT NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  tipo_producto VARCHAR(45) NULL DEFAULT NULL,
  fecha_vencimiento DATE NULL DEFAULT NULL,
  administrador_idadministrador INT NULL DEFAULT NULL,
  PRIMARY KEY (id_producto),
  CONSTRAINT fk_productos_administrador
    FOREIGN KEY (administrador_idadministrador) REFERENCES administrador (idadministrador)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS categoria_producto (
  id_categoria INT NOT NULL AUTO_INCREMENT,
  nombre_categoria VARCHAR(45) NOT NULL,
  tipo_categoria VARCHAR(45) NOT NULL,
  productos_id_producto INT NOT NULL,
  PRIMARY KEY (id_categoria),
  CONSTRAINT fk_categoria_producto_productos
    FOREIGN KEY (productos_id_producto) REFERENCES productos (id_producto)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS detalle_venta_productos (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  pago_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_detalle),
  CONSTRAINT fk_det_pago
    FOREIGN KEY (pago_id) REFERENCES pagos (id_pagos),
  CONSTRAINT fk_det_prod
    FOREIGN KEY (producto_id) REFERENCES productos (id_producto)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS rutinas (
  id_rutinas INT NOT NULL AUTO_INCREMENT,
  entrenador_id INT NOT NULL,
  nombre_rutina VARCHAR(100) NOT NULL,
  descripcion_ejercicios TEXT NOT NULL,
  fecha_creacion DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  planes_id_planes INT NOT NULL,
  PRIMARY KEY (id_rutinas),
  CONSTRAINT fk_rutina_entrenador
    FOREIGN KEY (entrenador_id) REFERENCES entrenador (id_entrenador),
  CONSTRAINT fk_rutinas_planes
    FOREIGN KEY (planes_id_planes) REFERENCES planes (id_planes)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;





SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO sede (id_sede, nombre_sede, direccion_sede, telefono_sede)
SELECT n, 'Gym Fit Style', 'Av. Principal #123-45', '+57 300 123 4567'
FROM (SELECT @row1 := @row1 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row1 := 0) r LIMIT 50) as sub;

INSERT INTO planes (id_planes, nombre_plan, tipo_plan, precio, duracion_dias, descripcion) VALUES
(1, 'Plan Basic', 'Mensual', 49900.00, 30, 'Acceso a zona de pesas y cardio.'),
(2, 'Plan Black', 'Mensual', 89900.00, 30, 'Acceso total, clases grupales y zona de relax.'),
(3, 'Plan Platinum', 'Anual', 850000.00, 365, 'Todo incluido, entrenador personal y nutrición.');

INSERT INTO planes (id_planes, nombre_plan, tipo_plan, precio, duracion_dias, descripcion)
SELECT n+3, CONCAT('Plan Personalizado ', n), 'Mensual', 49900 + (n * 500), 30, 'Servicios adicionales de entrenamiento y salud.'
FROM (SELECT @row2 := @row2 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row2 := 0) r LIMIT 47) as sub;

INSERT INTO usuario (idusuario, primer_nombre, primer_apellido, tipo_doc, num_doc, correo, rol, estado_cuenta)
SELECT n, 
    CASE WHEN n = 1 THEN 'Admin' WHEN n <= 11 THEN 'Entrenador' ELSE 'Cliente' END,
    CASE WHEN n = 1 THEN 'General' ELSE CONCAT('Usuario', n) END,
    'CC', 1010 + n, CONCAT('contacto', n, '@gymfitstyle.com'),
    CASE WHEN n = 1 THEN 'Administrador' WHEN n <= 11 THEN 'Entrenador' ELSE 'Cliente' END,
    'Activo'
FROM (SELECT @row3 := @row3 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row3 := 0) r LIMIT 50) as sub;

INSERT INTO administrador (idadministrador, usuario_id, cambiar_stock)
SELECT n, 1, 'Si'
FROM (SELECT @row4 := @row4 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row4 := 0) r LIMIT 50) as sub;

INSERT INTO entrenador (id_entrenador, usuario_id, especialidad, salario_hora)
SELECT n, (CASE WHEN n <= 10 THEN n + 1 ELSE 2 END), 'Fitness y Musculación', 35000.00
FROM (SELECT @row5 := @row5 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row5 := 0) r LIMIT 50) as sub;

INSERT INTO cliente (id_cliente, usuario_id, fecha_registro, entrenador_asignado, plan_actual, sede_id, fecha_vencimiento)
SELECT n, (CASE WHEN n + 11 <= 50 THEN n + 11 ELSE 12 END), '2024-01-01', (n % 10) + 1, (n % 3) + 1, 1, '2025-01-01'
FROM (SELECT @row6 := @row6 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row6 := 0) r LIMIT 50) as sub;

INSERT INTO asistencia (id_asistencia, usuario_id, fecha, hora_ingreso, total_horas_sesion)
SELECT n, (CASE WHEN n + 11 <= 50 THEN n + 11 ELSE 12 END), '2024-05-15', '2024-05-15 08:30:00', 1.5
FROM (SELECT @row7 := @row7 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row7 := 0) r LIMIT 50) as sub;

INSERT INTO pagos (id_pagos, id_cliente, id_plan, monto, metodo_pago)
SELECT n, n, (n % 3) + 1, 
    CASE WHEN (n % 3) + 1 = 1 THEN 49900.00 WHEN (n % 3) + 1 = 2 THEN 89900.00 ELSE 850000.00 END,
    'Tarjeta'
FROM (SELECT @row8 := @row8 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row8 := 0) r LIMIT 50) as sub;

INSERT INTO productos (id_producto, nombre_producto, stock, precio_venta, tipo_producto, administrador_idadministrador)
SELECT n, 
    CASE 
        WHEN n % 4 = 0 THEN 'Proteína Whey'
        WHEN n % 4 = 1 THEN 'Creatina'
        WHEN n % 4 = 2 THEN 'Aminoácidos'
        ELSE 'Pre-Entreno'
    END, 
    100, 145000.00, 'Suplemento', 1
FROM (SELECT @row9 := @row9 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row9 := 0) r LIMIT 50) as sub;

INSERT INTO categoria_producto (id_categoria, nombre_categoria, tipo_categoria, productos_id_producto)
SELECT n, 'Nutrición Deportiva', 'Venta Directa', n
FROM (SELECT @row10 := @row10 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row10 := 0) r LIMIT 50) as sub;

INSERT INTO detalle_venta_productos (id_detalle, pago_id, producto_id, cantidad, subtotal)
SELECT n, n, n, 1, 145000.00
FROM (SELECT @row11 := @row11 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row11 := 0) r LIMIT 50) as sub;

INSERT INTO rutinas (id_rutinas, entrenador_id, nombre_rutina, descripcion_ejercicios, planes_id_planes)
SELECT n, (n % 10) + 1, 'Entrenamiento Especializado', 'Ejercicios de fuerza y acondicionamiento según el plan seleccionado.', (n % 3) + 1
FROM (SELECT @row12 := @row12 + 1 AS n FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t2, (SELECT @row12 := 0) r LIMIT 50) as sub;

SET FOREIGN_KEY_CHECKS = 1;