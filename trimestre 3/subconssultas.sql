-- 1. Clientes con planes más caros que el promedio
SELECT *
FROM cliente
WHERE plan_actual IN (
    SELECT id_planes
    FROM planes
    WHERE precio > (SELECT AVG(precio) FROM planes)
);

-- 2. Usuarios que han hecho pagos
SELECT *
FROM usuario
WHERE idusuario IN (
    SELECT usuario_id
    FROM cliente
    WHERE id_cliente IN (
        SELECT id_cliente FROM pagos
    )
);

-- 3. Productos con precio mayor al promedio
SELECT nombre_producto, precio_venta
FROM productos
WHERE precio_venta > (
    SELECT AVG(precio_venta) FROM productos
);

-- 4. Clientes que no tienen entrenador asignado
SELECT *
FROM cliente
WHERE entrenador_asignado IS NULL;

-- 5. Plan más caro
SELECT *
FROM planes
WHERE precio = (
    SELECT MAX(precio) FROM planes
);