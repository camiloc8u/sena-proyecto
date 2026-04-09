CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login_usuario`(
    IN p_correo VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE v_salt VARCHAR(50) DEFAULT 'gym_salt_2026';

    SELECT idusuario, primer_nombre, primer_apellido, rol, estado_cuenta
    FROM usuario
    WHERE correo = p_correo
      AND password = SHA2(CONCAT(p_password, v_salt), 256)
      AND estado_cuenta = 'Activo';
END