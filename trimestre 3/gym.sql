CREATE TABLE IF NOT EXISTS usuario (
  idusuario INT NOT NULL AUTO_INCREMENT,
  primer_nombre VARCHAR(45) NOT NULL,
  segundo_nombre VARCHAR(45) NULL DEFAULT NULL,
  primer_apellido VARCHAR(45) NOT NULL,
  segundo_apellido VARCHAR(45) NULL DEFAULT NULL,
  tipo_doc ENUM('CC', 'TI', 'CE', 'Pasaporte') NOT NULL,
  num_doc VARCHAR(20) NOT NULL unique,
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