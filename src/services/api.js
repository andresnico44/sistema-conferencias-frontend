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

/** Papers/files en este microservicio: permitAll; sin Authorization (contrato actual). */
const getPaperHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

const papersBase = (conferenceId) =>
  `${PAPER_URL}/conferences/${encodeURIComponent(conferenceId)}/papers`;

const resolveFilenameFromDisposition = (disposition, fallback) => {
  const utfMatch = /filename\*=UTF-8''([^;\s]+)/i.exec(disposition || '');
  const asciiMatch = /filename="([^"]+)"|filename=([^;\s]+)/i.exec(disposition || '');
  const raw = utfMatch?.[1] || asciiMatch?.[1] || asciiMatch?.[2];
  if (!raw) return fallback;
  try {
    return decodeURIComponent(raw.replace(/^["']|["']$/g, ''));
  } catch {
    return raw;
  }
};

const parseError = async (response, fallbackMessage) => {
  try {
    const text = await response.text();
    if (!text) {
      return response.status === 500 ? `${fallbackMessage} (error del servidor, sin detalle)` : `${fallbackMessage} (HTTP ${response.status})`;
    }
    let errorData;
    try {
      errorData = JSON.parse(text);
    } catch {
      return text.length > 280 ? `${text.slice(0, 280)}…` : text;
    }

    const fieldList = errorData.fieldErrors || errorData.errors;
    if (Array.isArray(fieldList) && fieldList.length > 0) {
      const msgs = fieldList
        .map((fe) => fe.defaultMessage || fe.message || (fe.field != null ? `${fe.field}: inválido` : null))
        .filter(Boolean);
      if (msgs.length) return msgs.join(' · ');
    }

    return (
      errorData.message ||
      errorData.detail ||
      (typeof errorData.error === 'string' ? errorData.error : null) ||
      fallbackMessage
    );
  } catch {
    return `${fallbackMessage} (HTTP ${response.status})`;
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

  /**
   * POST /conferences/{conferenceId}/papers
   * multipart/form-data: parte "paper" = JSON (PaperCreateDto), partes "files" = adjuntos iniciales (opcional).
   */
  crearPaper: async (conferenceId, paperDto, archivosIniciales = []) => {
    const formData = new FormData();
    formData.append(
      'paper',
      new Blob([JSON.stringify(paperDto)], { type: 'application/json' })
    );
    for (const file of archivosIniciales) {
      formData.append('files', file, file.name);
    }

    const response = await fetch(`${papersBase(conferenceId)}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al crear paper'));
    return response.json();
  },

  /** GET /conferences/{conferenceId}/papers/evaluation-tray */
  obtenerBandejaEvaluacion: async (conferenceId) => {
    const response = await fetch(`${papersBase(conferenceId)}/evaluation-tray`, {
      method: 'GET',
      headers: getPaperHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener bandeja de evaluación'));
    return response.json();
  },

  /** GET /conferences/{conferenceId}/papers (?status=) */
  obtenerPapers: async (conferenceId, status) => {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    const response = await fetch(`${papersBase(conferenceId)}${query}`, {
      method: 'GET',
      headers: getPaperHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener papers'));
    return response.json();
  },

  /** GET /conferences/{conferenceId}/papers/{paperId} */
  obtenerPaper: async (conferenceId, paperId) => {
    const response = await fetch(`${papersBase(conferenceId)}/${encodeURIComponent(paperId)}`, {
      method: 'GET',
      headers: getPaperHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al obtener el paper'));
    return response.json();
  },

  /** PATCH /conferences/{conferenceId}/papers/{paperId}/evaluation */
  evaluarPaper: async (conferenceId, paperId, evaluacion) => {
    const response = await fetch(
      `${papersBase(conferenceId)}/${encodeURIComponent(paperId)}/evaluation`,
      {
        method: 'PATCH',
        headers: getPaperHeaders(),
        body: JSON.stringify(evaluacion),
      }
    );

    if (!response.ok) throw new Error(await parseError(response, 'Error al evaluar paper'));
    return response.json();
  },

  /**
   * POST /conferences/{conferenceId}/papers/{paperId}/documents
   * multipart: varias partes "files" (lista de archivos en Spring).
   */
  subirAdjuntosPaper: async (conferenceId, paperId, files) => {
    if (!conferenceId || !paperId) {
      throw new Error('conferenceId y paperId son obligatorios.');
    }
    if (!files?.length) {
      throw new Error('Selecciona al menos un archivo.');
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const response = await fetch(
      `${papersBase(conferenceId)}/${encodeURIComponent(paperId)}/documents`,
      {
        method: 'POST',
        headers: getPaperHeaders(false),
        body: formData,
      }
    );

    if (!response.ok) throw new Error(await parseError(response, 'Error al subir adjuntos'));
    return response.json().catch(() => ({}));
  },

  /**
   * GET /conferences/{conferenceId}/papers/{paperId}/documents/{attachmentId}
   * Nombre por defecto en servidor: "adjunto".
   */
  descargarAdjuntoPaperBlob: async (conferenceId, paperId, attachmentId, nombreSugerido) => {
    if (!conferenceId || !paperId || !attachmentId) {
      throw new Error('conferenceId, paperId y attachmentId son obligatorios.');
    }
    const response = await fetch(
      `${papersBase(conferenceId)}/${encodeURIComponent(paperId)}/documents/${encodeURIComponent(attachmentId)}`,
      {
        method: 'GET',
        headers: getPaperHeaders(false),
      }
    );

    if (!response.ok) {
      throw new Error(await parseError(response, 'Error al descargar el adjunto'));
    }
    const blob = await response.blob();
    const disposition = response.headers.get('Content-Disposition') || '';
    const filename = resolveFilenameFromDisposition(disposition, nombreSugerido || 'adjunto');
    return { blob, filename };
  },

  /** POST /conferences/{conferenceId}/files (multipart, campo file) */
  subirArchivoConferencia: async (conferenceId, file) => {
    if (!conferenceId) {
      throw new Error('conferenceId es obligatorio para subir archivos.');
    }
    if (!file) {
      throw new Error('Debes seleccionar un archivo para subir.');
    }

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch(`${PAPER_URL}/conferences/${encodeURIComponent(conferenceId)}/files`, {
      method: 'POST',
      headers: getPaperHeaders(false),
      body: formData,
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al subir archivo'));
    return response.json();
  },

  listarArchivosConferencia: async (conferenceId) => {
    const response = await fetch(`${PAPER_URL}/conferences/${encodeURIComponent(conferenceId)}/files`, {
      method: 'GET',
      headers: getPaperHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al listar archivos'));
    return response.json();
  },

  /**
   * GET /conferences/{conferenceId}/files/{fileId}
   */
  descargarArchivoConferenciaBlob: async (conferenceId, fileId, nombreSugerido) => {
    if (!conferenceId || !fileId) {
      throw new Error('conferenceId y fileId son obligatorios para descargar el archivo.');
    }
    const response = await fetch(
      `${PAPER_URL}/conferences/${encodeURIComponent(conferenceId)}/files/${encodeURIComponent(fileId)}`,
      {
        method: 'GET',
        headers: getPaperHeaders(false),
      }
    );

    if (!response.ok) {
      throw new Error(await parseError(response, 'Error al descargar el archivo'));
    }
    const blob = await response.blob();
    const disposition = response.headers.get('Content-Disposition') || '';
    const filename = resolveFilenameFromDisposition(disposition, nombreSugerido || 'file');
    return { blob, filename };
  },

  eliminarArchivoConferencia: async (fileId) => {
    const response = await fetch(`${PAPER_URL}/conferences/files/${encodeURIComponent(fileId)}`, {
      method: 'DELETE',
      headers: getPaperHeaders()
    });

    if (!response.ok) throw new Error(await parseError(response, 'Error al eliminar archivo'));
    if (response.status === 204) return { ok: true };
    return response.json();
  }
};
