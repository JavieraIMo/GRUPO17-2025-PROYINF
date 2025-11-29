-- MIGRACIÓN: Permitir múltiples cuentas por RUT hasta ClaveÚnica
-- 1. Quitar restricción UNIQUE sobre rut
ALTER TABLE clientes DROP CONSTRAINT IF EXISTS clientes_rut_key;

-- 2. Agregar campo para verificación ClaveÚnica
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS claveunica_verificada BOOLEAN DEFAULT false;

-- 3. (Opcional) Crear índice para búsquedas rápidas por rut y verificación
CREATE INDEX IF NOT EXISTS idx_clientes_rut_verificada ON clientes(rut, claveunica_verificada);
