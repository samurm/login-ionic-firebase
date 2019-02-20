export const ERROR_AUTH = {
    'auth/invalid-email': 'Email incorrecto, intenta de nuevo.',
    'auth/email-already-in-use': 'Ese email ya está registrado, ¡Prueba a iniciar sesión!',
    'auth/weak-password': 'La contraseña debe contener al menos 6 carácteres',
    'default': '!Ups! Lo sentimos, ha ocurrido algún error, prueba de nuevo.'
};

export const TOKEN_KEY  = 'auth-token';

export const REGEXP = {
    USERNAME : /^[A-Z|a-z|0-9]{6,50}/,
    EMAIL : /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z]exi)*\.)+[a-zA-Z]{2,9})$/
};
