const AUTH_URL = 'https://auth-microservice-project-backend.onrender.com/api/v1/auth';
const CONF_URL = 'https://conference-microservice-project-backend.onrender.com/conferences';
const PAPER_URL = 'https://paper-microservice-project-backend.onrender.com';

const getToken = () => localStorage.getItem('accessToken');

const getAuthHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
};

const parseError = async (response, fallbackMessage) => {
  try {
    const errorData = await response.json();
    return errorData?.message || errorData?.error || errorData?.details || fallbackMessage;
  } catch {
    try {
      const errorText = await response.text();
      return errorText || `${fallbackMessage} (HTTP ${response.status})`;
    } catch {
      return `${fallbackMessage} (HTTP ${response.status})`;
    }
  }
};

export const apiService = {
  login: async (credenciales) => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email: credenciales.correo,
        password: credenciales.password
      }),
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al iniciar sesión'));
    return response.json();
  },

  registro: async (datos) => {
    const uniqueDocumentNumber = `${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90) + 10}`;

    const bodyBackend = {
      documentType: "CC",
      documentNumber: uniqueDocumentNumber,
      firstName: datos.nombre,
      lastName: datos.apellido,
      email: datos.correo,
      phoneNumber: datos.telefono,
      password: datos.password,
      institution: "Ninguna",
      country: "Colombia",
      city: "Desconocida",
      role: "AUTHOR"
    };

    const response = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bodyBackend),
    });

    if (!response.ok) {
      throw new Error(await parseError(response, 'Error en el registro'));
    }

    return response.json();
  },

  obtenerConferencias: async () => {
    const response = await fetch(`${CONF_URL}/get-all`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener conferencias'));
    return response.json();
  },

  crearConferencia: async (datos) => {
    const bodyBackend = {
      name: datos.name,
      description: datos.description,
      location: datos.location,
      virtual: Boolean(datos.virtual),
      inscriptionPrice: Number(datos.inscriptionPrice),
      startDate: datos.startDate,
      endDate: datos.endDate,
      submissionDeadline: datos.submissionDeadline,
      state: datos.state
    };

    const response = await fetch(`${CONF_URL}/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bodyBackend),
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al crear conferencia'));
    return response.json();
  },

  crearPaper: async (datos) => {
    const response = await fetch(`${PAPER_URL}/papers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(datos),
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al crear paper'));
    return response.json();
  },

  obtenerBandejaEvaluacion: async () => {
    const response = await fetch(`${PAPER_URL}/papers/evaluation-tray`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener bandeja de evaluación'));
    return response.json();
  },

  obtenerPapers: async (status) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    const response = await fetch(`${PAPER_URL}/papers${query}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener papers'));
    return response.json();
  },

  evaluarPaper: async (paperId, evaluacion) => {
    const response = await fetch(`${PAPER_URL}/papers/${paperId}/evaluate`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(evaluacion),
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al evaluar paper'));
    return response.json();
  },

  subirArchivoConferencia: async (conferenceId, file) => {
    if (!conferenceId) {
      throw new Error('conferenceId es obligatorio para subir archivos.');
    }
    if (!file) {
      throw new Error('Debes seleccionar un archivo para subir.');
    }

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('conferenceId', String(conferenceId));

    const response = await fetch(`${PAPER_URL}/conferences/${conferenceId}/files`, {
      method: 'POST',
      headers: getAuthHeaders(false),
      body: formData,
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al subir archivo'));
    return response.json();
  },

  listarArchivosConferencia: async (conferenceId) => {
    const response = await fetch(`${PAPER_URL}/conferences/${conferenceId}/files`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al listar archivos'));
    return response.json();
  },

  eliminarArchivoConferencia: async (fileId) => {
    const response = await fetch(`${PAPER_URL}/conferences/files/${fileId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al eliminar archivo'));
    if (response.status === 204) return { ok: true };
    return response.json();
  }
};