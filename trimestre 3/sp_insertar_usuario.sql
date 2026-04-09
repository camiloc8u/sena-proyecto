CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_usuario`(
    IN p_primer_nombre VARCHAR(45),
    IN p_segundo_nombre VARCHAR(45),
    IN p_primer_apellido VARCHAR(45),
    IN p_segundo_apellido VARCHAR(45),
    IN p_tipo_doc ENUM('CC','TI','CE','Pasaporte'),
    IN p_num_doc VARCHAR(20),
    IN p_telefono VARCHAR(20),
    IN p_correo VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_rol ENUM('Administrador','Entrenador','Cliente')
)
BEGIN
    DECLARE v_hash VARCHAR(64);
    DECLARE v_salt VARCHAR(50) DEFAULT 'gym_salt_2026';

    -- Generar hash SHA2 con salt
    SET v_hash = SHA2(CONCAT(p_password, v_salt), 256);

    INSERT INTO usuario (
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        tipo_doc,
        num_doc,
        telefono,
        correo,
        password,
        rol
    ) VALUES (
        p_primer_nombre,
        p_segundo_nombre,
        p_primer_apellido,
        p_segundo_apellido,
        p_tipo_doc,
        p_num_doc,
        p_telefono,
        p_correo,
        v_hash,
        p_rol
    );
END