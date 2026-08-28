-- 1. Listar todos los usuarios
SELECT * FROM usuario;

-- 2. Mostrar solo clientes activos
SELECT * 
FROM usuario
WHERE rol = 'Cliente' AND estado_cuenta = 'Activo';

-- 3. Ver todos los planes con precio mayor a 50.000
SELECT * 
FROM planes
WHERE precio > 50000;

-- 4. Listar productos con bajo stock (<10)
SELECT nombre_producto, stock
FROM productos
WHERE stock < 10;

-- 5. Mostrar pagos realizados por tarjeta
SELECT * 
FROM pagos
WHERE metodo_pago = 'Tarjeta';