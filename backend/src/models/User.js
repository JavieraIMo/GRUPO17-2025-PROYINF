// =====================================================
// MODELO: User.js
// Maneja toda la lógica de datos de usuarios
// =====================================================

const db = require('../../db');
const bcrypt = require('bcrypt');

class User {
    constructor(data) {
        this.id = data.id;
        this.rut = data.rut;
        this.nombre_completo = data.nombre_completo;
        this.email = data.email;
        this.telefono = data.telefono;
        this.password_hash = data.password_hash;
        this.fecha_registro = data.fecha_registro;
        this.activo = data.activo;
    }

    // ==========================================
    // MÉTODOS ESTÁTICOS (No requieren instancia)
    // ==========================================

    /**
     * Crear un nuevo usuario
     */
    static async create(userData) {
        try {
            // Encriptar contraseña
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(userData.password, saltRounds);

            const query = `
                INSERT INTO clientes (rut, nombre_completo, email, telefono, password_hash)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, rut, nombre_completo, email, telefono, fecha_registro, activo
            `;

            const values = [
                userData.rut,
                userData.nombre_completo,
                userData.email,
                userData.telefono || null,
                password_hash
            ];

            const result = await db.query(query, values);
            return new User(result.rows[0]);
            
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    /**
     * Buscar usuario por email
     */
    static async findByEmail(email) {
        try {
            const query = 'SELECT * FROM clientes WHERE email = $1 AND activo = true';
            const result = await db.query(query, [email]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            return new User(result.rows[0]);
            
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    /**
     * Buscar usuario por RUT
     */
    static async findByRut(rut) {
        try {
            const query = 'SELECT * FROM clientes WHERE rut = $1 AND activo = true';
            const result = await db.query(query, [rut]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            return new User(result.rows[0]);
            
        } catch (error) {
            throw new Error(`Error finding user by RUT: ${error.message}`);
        }
    }

    /**
     * Buscar usuario por ID
     */
    static async findById(id) {
        try {
            const query = 'SELECT * FROM clientes WHERE id = $1 AND activo = true';
            const result = await db.query(query, [id]);
            
            if (result.rows.length === 0) {
                return null;
            }
            
            return new User(result.rows[0]);
            
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    /**
     * Verificar si un email ya existe
     */
    static async emailExists(email) {
        try {
            const query = 'SELECT 1 FROM clientes WHERE email = $1';
            const result = await db.query(query, [email]);
            return result.rows.length > 0;
            
        } catch (error) {
            throw new Error(`Error checking email existence: ${error.message}`);
        }
    }

    /**
     * Verificar si un RUT ya existe
     */
    static async rutExists(rut) {
        try {
            const query = 'SELECT 1 FROM clientes WHERE rut = $1';
            const result = await db.query(query, [rut]);
            return result.rows.length > 0;
            
        } catch (error) {
            throw new Error(`Error checking RUT existence: ${error.message}`);
        }
    }

    // ==========================================
    // MÉTODOS DE INSTANCIA
    // ==========================================

    /**
     * Verificar contraseña
     */
    async verifyPassword(password) {
        try {
            return await bcrypt.compare(password, this.password_hash);
        } catch (error) {
            throw new Error(`Error verifying password: ${error.message}`);
        }
    }

    /**
     * Actualizar información del usuario
     */
    async update(updateData) {
        try {
            const fields = [];
            const values = [];
            let counter = 1;

            // Construir query dinámicamente
            for (const [key, value] of Object.entries(updateData)) {
                if (key !== 'id' && key !== 'password' && value !== undefined) {
                    fields.push(`${key} = $${counter}`);
                    values.push(value);
                    counter++;
                }
            }

            if (fields.length === 0) {
                throw new Error('No fields to update');
            }

            // Agregar fecha de actualización
            fields.push(`fecha_actualizacion = NOW()`);
            values.push(this.id);

            const query = `
                UPDATE clientes 
                SET ${fields.join(', ')}
                WHERE id = $${counter}
                RETURNING *
            `;

            const result = await db.query(query, values);
            
            // Actualizar la instancia actual
            Object.assign(this, result.rows[0]);
            return this;
            
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    /**
     * Cambiar contraseña
     */
    async changePassword(newPassword) {
        try {
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(newPassword, saltRounds);
            
            const query = `
                UPDATE clientes 
                SET password_hash = $1, fecha_actualizacion = NOW()
                WHERE id = $2
            `;
            
            await db.query(query, [password_hash, this.id]);
            this.password_hash = password_hash;
            
        } catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }

    /**
     * Desactivar usuario (soft delete)
     */
    async deactivate() {
        try {
            const query = `
                UPDATE clientes 
                SET activo = false, fecha_actualizacion = NOW()
                WHERE id = $1
            `;
            
            await db.query(query, [this.id]);
            this.activo = false;
            
        } catch (error) {
            throw new Error(`Error deactivating user: ${error.message}`);
        }
    }

    /**
     * Convertir a JSON (excluir datos sensibles)
     */
    toJSON() {
        const {password_hash, ...userWithoutPassword} = this;
        return userWithoutPassword;
    }
}

module.exports = User;