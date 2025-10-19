// =====================================================
// UTILIDADES: validators.js
// Funciones de validación reutilizables
// =====================================================

/**
 * Validar RUT chileno con algoritmo oficial
 * @param {string} rut - RUT en formato XX.XXX.XXX-X
 * @returns {boolean} - true si es válido
 */
function validateRut(rut) {
    if (!rut || typeof rut !== 'string') {
        return false;
    }

    // Limpiar RUT (remover puntos y guión)
    const cleanRut = rut.replace(/\./g, '').replace('-', '');
    
    // Verificar formato básico
    if (!/^\d{7,8}[0-9kK]$/.test(cleanRut)) {
        return false;
    }

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toLowerCase();

    // Algoritmo de validación chileno
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const calculatedDv = remainder < 2 ? remainder.toString() : (11 - remainder === 10 ? 'k' : (11 - remainder).toString());

    return dv === calculatedDv;
}

/**
 * Validar email con regex robusta
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // Regex RFC 5322 simplificada
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Verificaciones adicionales
    if (email.length > 320) return false; // Límite RFC
    if (email.includes('..')) return false; // Puntos consecutivos
    if (email.startsWith('.') || email.endsWith('.')) return false;
    
    return emailRegex.test(email);
}

/**
 * Validar contraseña con criterios de seguridad
 * @param {string} password - Contraseña a validar
 * @returns {object} - {isValid: boolean, message: string}
 */
function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return {
            isValid: false,
            message: 'La contraseña es requerida'
        };
    }

    const criteria = {
        minLength: password.length >= 6,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const errors = [];
    
    if (!criteria.minLength) {
        errors.push('mínimo 6 caracteres');
    }
    if (!criteria.hasUpperCase) {
        errors.push('una mayúscula');
    }
    if (!criteria.hasLowerCase) {
        errors.push('una minúscula');
    }
    if (!criteria.hasNumber) {
        errors.push('un número');
    }

    if (errors.length > 0) {
        return {
            isValid: false,
            message: `La contraseña debe contener: ${errors.join(', ')}`
        };
    }

    return {
        isValid: true,
        message: 'Contraseña válida'
    };
}

/**
 * Validar teléfono chileno
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return true; // Teléfono es opcional
    }

    // Formatos válidos: +56912345678, 56912345678, 912345678, +569 1234 5678
    const phoneRegex = /^(\+?56)?([2-9]\d{8}|9\d{8})$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    
    return phoneRegex.test(cleanPhone);
}

/**
 * Sanitizar string para prevenir XSS
 * @param {string} input - String a sanitizar
 * @returns {string} - String sanitizado
 */
function sanitizeString(input) {
    if (typeof input !== 'string') {
        return input;
    }

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * Validar que todos los campos requeridos estén presentes
 * @param {object} data - Datos a validar
 * @param {array} requiredFields - Campos requeridos
 * @returns {object} - {isValid: boolean, missingFields: array}
 */
function validateRequiredFields(data, requiredFields) {
    const missingFields = requiredFields.filter(field => {
        const value = data[field];
        return value === undefined || value === null || value === '';
    });

    return {
        isValid: missingFields.length === 0,
        missingFields
    };
}

/**
 * Formatear RUT chileno
 * @param {string} rut - RUT sin formato
 * @returns {string} - RUT formateado XX.XXX.XXX-X
 */
function formatRut(rut) {
    if (!rut) return '';
    
    const cleanRut = rut.replace(/\./g, '').replace('-', '');
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    
    // Agregar puntos cada 3 dígitos desde la derecha
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${formattedBody}-${dv}`;
}

module.exports = {
    validateRut,
    validateEmail,
    validatePassword,
    validatePhone,
    validateRequiredFields,
    sanitizeString,
    formatRut
};