CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_password`(
    IN p_idusuario INT,
    IN p_nueva_password VARCHAR(255)
)
BEGIN
    DECLARE v_hash VARCHAR(64);
    DECLARE v_salt VARCHAR(50) DEFAULT 'gym_salt_2026';

    SET v_hash = SHA2(CONCAT(p_nueva_password, v_salt), 256);

    UPDATE usuario
    SET password = v_hash
    WHERE idusuario = p_idusuario;
END