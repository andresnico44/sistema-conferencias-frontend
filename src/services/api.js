// src/services/api.js

// URL base para Autenticación
const AUTH_URL = 'https://auth-microservice-project-backend.onrender.com/api/v1/auth';
// URL base para Conferencias
const CONF_URL = 'https://conference-microservice-project-backend.onrender.com/conferences';

export const apiService = {
  
  // 1. LOGIN
  login: async (credenciales) => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credenciales.correo, // Mapeamos del español al inglés del backend
        password: credenciales.password
      }),
    });
    
    if (!response.ok) throw new Error('Error al iniciar sesión');
    return response.json(); // Retorna { accessToken, name }
  },

  // 2. REGISTRO DE USUARIO
  registro: async (datos) => {
    // Mapeamos los datos del frontend (español) al formato exacto que pide el backend (inglés)
    const bodyBackend = {
      documentType: "CC", // Valor por defecto o lo puedes agregar al formulario después
      documentNumber: "00000000", // Falso por ahora
      firstName: datos.nombre,
      lastName: datos.apellido,
      email: datos.correo,
      phoneNumber: datos.telefono,
      password: datos.password,
      institution: "Ninguna",
      country: "Colombia",
      city: "Desconocida",
      role: "AUTHOR" // Por defecto
    };

    const response = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyBackend),
    });
    
    if (!response.ok) throw new Error('Error en el registro');
    return response.json();
  },

  // 3. OBTENER TODAS LAS CONFERENCIAS
  obtenerConferencias: async () => {
    const response = await fetch(`${CONF_URL}/get-all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) throw new Error('Error al obtener conferencias');
    return response.json();
  },

  // 4. CREAR CONFERENCIA
  crearConferencia: async (datos) => {
    const bodyBackend = {
      name: datos.titulo,
      description: datos.descripcion,
      location: datos.lugar,
      virtual: false, // Puedes agregar un checkbox en el frontend después
      inscriptionPrice: parseFloat(datos.precio), // El backend pide un Float
      startDate: datos.fecha,
      endDate: datos.fecha, // Usando la misma por simplicidad
      submissionDeadline: datos.fecha,
      state: "PUBLISHED"
    };

    const response = await fetch(`${CONF_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyBackend),
    });
    
    if (!response.ok) throw new Error('Error al crear conferencia');
    return response.json();
  }
};