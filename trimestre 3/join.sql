-- 1. Clientes con su plan actual
SELECT u.primer_nombre, u.primer_apellido, p.nombre_plan
FROM cliente c
JOIN usuario u ON c.usuario_id = u.idusuario
JOIN planes p ON c.plan_actual = p.id_planes;

-- 2. Clientes con su entrenador asignado
SELECT u.primer_nombre AS cliente,
       e.id_entrenador,
       u2.primer_nombre AS entrenador
FROM cliente c
JOIN usuario u ON c.usuario_id = u.idusuario
JOIN entrenador e ON c.entrenador_asignado = e.id_entrenador
JOIN usuario u2 ON e.usuario_id = u2.idusuario;

-- 3. Pagos con información del cliente y plan
SELECT u.primer_nombre, p.monto, pl.nombre_plan
FROM pagos p
JOIN cliente c ON p.id_cliente = c.id_cliente
JOIN usuario u ON c.usuario_id = u.idusuario
JOIN planes pl ON p.id_plan = pl.id_planes;

-- 4. Productos con su administrador
SELECT pr.nombre_producto, u.primer_nombre
FROM productos pr
JOIN administrador a ON pr.administrador_idadministrador = a.idadministrador
JOIN usuario u ON a.usuario_id = u.idusuario;

-- 5. Rutinas con nombre del entrenador
SELECT r.nombre_rutina, u.primer_nombre
FROM rutinas r
JOIN entrenador e ON r.entrenador_id = e.id_entrenador
JOIN usuario u ON e.usuario_id = u.idusuario;