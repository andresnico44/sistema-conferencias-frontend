# Sistema de conferencias frontend

Frontend de ConfManager construido con React 19, Vite y React Router. La aplicacion permite descubrir conferencias, autenticar usuarios, crear y editar eventos, enviar articulos y gestionar sus adjuntos/evaluaciones contra un API Gateway.

## Stack y estructura

- `src/App.jsx`: declara las rutas publicas de la SPA.
- `src/components/`: vistas y flujos de usuario.
- `src/services/api.js`: cliente HTTP centralizado para auth, conferencias, papers y archivos.
- `src/styles/components/`: estilos CSS por componente, mas utilidades compartidas como `shared-forms.css`.
- `vite.config.js`: configura React, prefijos de variables de entorno y `vite preview` con hosts permitidos.

## Configuracion local

Requisitos:

- Node.js compatible con Vite 8.
- Un API Gateway accesible desde el navegador.

Instalacion y ejecucion:

```bash
npm install
cp .env.example .env.local # si existe en tu entorno; este repo no versiona .env
npm run dev
```

Define una de estas variables antes de iniciar Vite:

```bash
VITE_API_GATEWAY_URL=http://localhost:8080
# o, por compatibilidad con vite.config.js:
API_GATEWAY_URL=http://localhost:8080
```

`src/services/api.js` espera que esa URL base no termine en una ruta especifica; el cliente agrega los segmentos `/api/v1/auth`, `/conferences`, `/papers` y `/files`.

Comandos disponibles:

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor local de Vite con HMR. |
| `npm run build` | Build de produccion en `dist/`. |
| `npm run preview` | Sirve el build localmente con Vite. |
| `npm run start` | Preview para despliegue, usando `--host 0.0.0.0 --port $PORT`. |
| `npm run lint` | ESLint sobre archivos JS/JSX. |

## Rutas principales

| Ruta | Componente | Proposito |
| --- | --- | --- |
| `/` | `Home` | Landing inicial con acceso al catalogo. |
| `/iniciar-sesion` | `Login` | Autentica al usuario y guarda `accessToken`/`userName` en `localStorage`. |
| `/registro` | `Registro` | Registra usuarios con rol backend fijo `AUTHOR`. |
| `/conferencias` | `Conferencias` | Lista conferencias, aplica busqueda local por nombre o categoria y enlaza al detalle. |
| `/conferencia/:id` | `LandingConferencia` | Muestra detalle de conferencia, fechas, ponentes, topicos y acciones. |
| `/crear-conferencia` | `CrearConferencia` | Crea eventos y normaliza topicos/ponentes separados por coma. |
| `/editar-conferencia/:id` | `EditarConferencia` | Carga, actualiza o elimina una conferencia existente. |
| `/enviar-articulo/:conferenciaId` | `EnviarArticulo` | Crea un paper con metadatos y adjuntos iniciales opcionales. |
| `/conferencia/:conferenciaId/articulo/:paperId` | `DetalleArticulo` | Consulta, descarga/previsualiza adjuntos PDF, agrega archivos y actualiza estado de evaluacion. |

Todas las rutas se renderizan dentro de `Layout`, que incluye `Navbar` y `Footer`.

## Contrato del API Gateway

El cliente vive en `src/services/api.js` y usa `fetch`. Los errores HTTP se convierten en mensajes legibles con `parseError`, incluyendo `message`, `detail`, `error`, `fieldErrors` o `errors` cuando el backend los envia.

### Autenticacion

- `POST /api/v1/auth/login`
  - Body enviado: `{ email, password }`, mapeado desde el formulario `{ correo, password }`.
  - Si la respuesta contiene `accessToken`, `Login` lo guarda en `localStorage`.
- `POST /api/v1/auth/register`
  - Body enviado con `documentType: "CC"`, `role: "AUTHOR"` y valores por defecto para institucion, pais y ciudad.
  - `documentNumber` se genera en frontend con timestamp y aleatorio para evitar colisiones simples.

Las peticiones de auth y conferencias agregan `Authorization: Bearer <accessToken>` cuando existe token.

### Conferencias

Base: `/conferences`

- `GET /get-all`: catalogo de conferencias.
- `GET /get/{id}`: detalle de conferencia.
- `POST /create`: crea conferencia.
- `PUT /edit/{id}`: edita conferencia.
- `DELETE /delete/{id}`: elimina conferencia.

Campos enviados al crear/editar:

```json
{
  "name": "Conferencia IA 2026",
  "description": "Evento sobre IA aplicada",
  "location": "Bogota",
  "virtual": false,
  "inscriptionPrice": 0,
  "startDate": "2026-05-01",
  "endDate": "2026-05-03",
  "submissionDeadline": "2026-05-02",
  "topics": ["IA", "Microservicios"],
  "speakers": ["Ana Perez", "Luis Gomez"],
  "state": "PUBLISHED"
}
```

Restricciones implementadas en UI:

- `CrearConferencia` rechaza `endDate < startDate`.
- `CrearConferencia` exige que `submissionDeadline` quede entre inicio y fin.
- `topics` y `speakers` se ingresan como texto separado por comas y se normalizan a arreglos.
- Estados disponibles: `DRAFT`, `PUBLISHED`, `IN_PROGRESS`, `CLOSED`, `ACTIVE`.

### Papers y adjuntos

Base: `/papers/conference/{conferenceId}`

- `POST /create`: crea un paper en `multipart/form-data`.
  - Parte `paper`: JSON de `PaperCreateDto`.
  - Parte `files`: cero o mas adjuntos iniciales.
- `GET /{paperId}`: detalle del paper.
- `GET /list?status=`: lista papers de una conferencia.
- `GET /evaluations-tray`: bandeja de evaluacion.
- `PATCH /{paperId}/evaluations`: actualiza `status` y `observations`.
- `POST /{paperId}/attachments`: agrega adjuntos.
- `GET /{paperId}/attachments/{attachmentId}`: descarga adjunto como blob.

`EnviarArticulo` valida que `conferenceId` sea numerico positivo o UUID, y que los campos de texto no queden vacios. Los adjuntos aceptados en UI son `.pdf`, `.doc` y `.docx`.

Estados de paper mostrados por `DetalleArticulo`:

- `SUBMITTED`
- `ACCEPTED`
- `REJECTED`
- `IN_CORRECTIONS`
- `PRESENTED`
- `PUBLISHED`

### Archivos de conferencia

Base: `/files`

- `POST /upload/{conferenceId}`: sube un archivo con campo `file`.
- `GET /list/{conferenceId}`: lista archivos de conferencia.
- `GET /{conferenceId}/download/{fileId}`: descarga archivo como blob.
- `DELETE /delete/{fileId}`: elimina archivo.

> Nota: segun el comentario del cliente actual, los endpoints de papers/files son `permitAll`; por eso esas llamadas no envian `Authorization`.

## Flujos de desarrollo comunes

### Agregar una vista nueva

1. Crear el componente en `src/components/NombreVista.jsx`.
2. Agregar sus estilos en `src/styles/components/nombre-vista.css` e importarlos desde el componente.
3. Registrar la ruta en `src/App.jsx`.
4. Si necesita backend, agregar una funcion en `apiService` para mantener el contrato HTTP centralizado.
5. Enlazar desde `Navbar`, `LandingConferencia` u otra vista segun corresponda.

### Cambiar un contrato de backend

1. Actualizar primero la funcion correspondiente en `src/services/api.js`.
2. Ajustar los formularios o mapeos que consumen esa funcion.
3. Revisar mensajes de error: `parseError` ya soporta texto plano, JSON con `message/detail/error` y listas de errores de campo.
4. Ejecutar `npm run lint` y `npm run build`.

## Despliegue

El script `npm run start` ejecuta:

```bash
vite preview --host 0.0.0.0 --port $PORT
```

Esto asume que la plataforma de despliegue define `PORT`. Tambien debes configurar `VITE_API_GATEWAY_URL` o `API_GATEWAY_URL` en el entorno del build/runtime usado por Vite.

## Troubleshooting

- **Las llamadas salen a `undefined/...`**: falta `VITE_API_GATEWAY_URL` o `API_GATEWAY_URL`. Reinicia Vite despues de definirla.
- **401/403 en conferencias**: revisa que `Login` haya recibido `accessToken` y que exista en `localStorage`.
- **Papers o archivos no llevan token**: es el contrato actual del cliente; `getPaperHeaders` omite `Authorization` para `/papers` y `/files`.
- **No se puede previsualizar un adjunto**: la vista previa solo se habilita para PDF detectado por `contentType` o extension `.pdf`; otros formatos deben descargarse.
- **Nombre de descarga inesperado**: si el backend no envia `Content-Disposition`, el frontend usa `adjunto` o `file` como nombre por defecto.
- **Fechas desplazadas por zona horaria**: las fechas con formato `YYYY-MM-DD` se normalizan creando `Date(year, month, day)` para evitar conversion UTC en catalogo y detalle.
