-- =====================================================
-- ESQUEMA SIMPLIFICADO PARA HU-1: REGISTRO DE USUARIO
-- Solo tabla clientes para probar funcionalidad básica
-- =====================================================

-- Eliminar tabla si existe (para desarrollo)
DROP TABLE IF EXISTS clientes CASCADE;

-- =====================================================
-- TABLA ÚNICA: CLIENTES (Para HU-1)
-- =====================================================
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre_completo VARCHAR(200) NOT NULL,
    fecha_nacimiento DATE,
    email VARCHAR(320) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    ingresos DECIMAL(12,2),
    historial_crediticio TEXT,
    password_hash TEXT NOT NULL,
    fecha_registro TIMESTAMPTZ DEFAULT NOW(),
    fecha_actualizacion TIMESTAMPTZ DEFAULT NOW(),
    activo BOOLEAN DEFAULT true,
    
    -- Validaciones
    CONSTRAINT rut_format CHECK (rut ~ '^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$'),
    CONSTRAINT email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT ingresos_positive CHECK (ingresos IS NULL OR ingresos >= 0)
);

-- Índices para optimización
CREATE INDEX idx_clientes_rut ON clientes(rut);
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_activo ON clientes(activo);

-- =====================================================
-- TRIGGER PARA ACTUALIZACIÓN AUTOMÁTICA
-- =====================================================

-- Función para actualizar fecha_actualizacion
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para clientes
CREATE TRIGGER update_clientes_fecha_actualizacion
    BEFORE UPDATE ON clientes
    FOR EACH ROW
    EXECUTE FUNCTION update_fecha_actualizacion();

-- =====================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE clientes IS 'Tabla principal de usuarios/clientes del sistema - HU-1 Registro';
COMMENT ON COLUMN clientes.rut IS 'RUT chileno formato: XX.XXX.XXX-X';
COMMENT ON COLUMN clientes.password_hash IS 'Contraseña encriptada con bcrypt';
COMMENT ON COLUMN clientes.email IS 'Email único para login y comunicación';
COMMENT ON COLUMN clientes.activo IS 'Soft delete - false para usuarios desactivados';

-- =====================================================
-- USUARIO DE PRUEBA (OPCIONAL)
-- =====================================================

-- Usuario de prueba (contraseña: "test123" - hash real se genera con bcrypt)
INSERT INTO clientes (rut, nombre_completo, email, telefono, password_hash, activo) VALUES
('12.345.678-9', 'Usuario De Prueba', 'test@alara.cl', '+56912345678', '$2b$10$dummy.hash.for.testing.only.replace.with.real.bcrypt', true);

-- =====================================================
-- VERIFICACIÓN DE LA TABLA CREADA
-- =====================================================

-- Mostrar estructura de la tabla
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'clientes' 
ORDER BY ordinal_position;

-- Mostrar constraints
SELECT 
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'clientes';

-- Conteo de registros
SELECT COUNT(*) as total_usuarios FROM clientes;

-- =====================================================
-- FINAL DEL SCRIPT
-- =====================================================

-- Mensaje de confirmación
SELECT 'Esquema simplificado para HU-1 creado exitosamente' AS status;
SELECT 'Tabla clientes lista para registro de usuarios' AS message;
SELECT 'Ejecutar backend con: npm start' AS next_step;