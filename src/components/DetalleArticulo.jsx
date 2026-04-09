import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/components/detalle-articulo.css';

const DetalleArticulo = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [evaluacion, setEvaluacion] = useState({
    status: 'ACCEPTED',
    comments: ''
  });

  const getEstadoClass = (estado) => {
    const normalized = (estado || '').toUpperCase();
    if (normalized === 'ACCEPTED' || normalized === 'ACEPTADO') return 'detalle-estado detalle-estado--aceptado';
    if (normalized === 'REJECTED' || normalized === 'RECHAZADO') return 'detalle-estado detalle-estado--rechazado';
    return 'detalle-estado detalle-estado--revision';
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cargarArticulo = useCallback(async () => {
    setError('');
    setCargando(true);
    try {
      const respuesta = await apiService.obtenerPapers();
      const papers = Array.isArray(respuesta) ? respuesta : (respuesta?.data || respuesta?.content || []);
      const encontrado = papers.find((paper) => String(paper?.id || paper?.paperId) === String(id));

      if (!encontrado) {
        throw new Error('No se encontró el artículo solicitado.');
      }

      setArticulo(encontrado);

      const conferenceId = encontrado?.conferenceId || encontrado?.conference?.id;
      if (conferenceId) {
        const archivosResp = await apiService.listarArchivosConferencia(conferenceId);
        const archivosList = Array.isArray(archivosResp) ? archivosResp : (archivosResp?.data || archivosResp?.content || []);
        setArchivos(archivosList);
      } else {
        setArchivos([]);
      }
    } catch (err) {
      setError(err.message || 'No se pudo cargar el detalle del artículo.');
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    cargarArticulo();
  }, [cargarArticulo]);

  const handleEvaluar = async (e) => {
    e.preventDefault();
    try {
      await apiService.evaluarPaper(id, {
        status: evaluacion.status,
        comments: evaluacion.comments
      });
      await cargarArticulo();
    } catch (err) {
      setError(err.message || 'No fue posible evaluar el artículo.');
    }
  };

  const handleEliminarArchivo = async (fileId) => {
    try {
      await apiService.eliminarArchivoConferencia(fileId);
      setArchivos((prev) => prev.filter((file) => String(file?.id || file?.fileId) !== String(fileId)));
    } catch (err) {
      setError(err.message || 'No fue posible eliminar el archivo.');
    }
  };

  if (cargando) {
    return (
      <div className="detalle-page detalle-loading">
        Cargando detalle del artículo...
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="detalle-error-wrap">
        <div className="detalle-error">{error || 'No se encontró el artículo solicitado.'}</div>
      </div>
    );
  }

  const estadoActual = articulo?.status || articulo?.estado || 'EN_REVISION';
  const autoresTexto = Array.isArray(articulo?.authors) ? articulo.authors.join(', ') : (articulo?.authors || articulo?.autores || 'Sin autores');
  const conferenceId = articulo?.conferenceId || articulo?.conference?.id;

  return (
    <div className="detalle-page">
      <div className="detalle-back">
        <Link to="/conferencias" className="detalle-back-link">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="detalle-card">
        <div className="detalle-header">
          <div>
            <div className="detalle-header-meta">
              <span className="detalle-id-label">Artículo #{articulo.id || articulo.paperId}</span>
              <span className={getEstadoClass(estadoActual)}>
                {estadoActual}
              </span>
            </div>
            <h1 className="detalle-title">{articulo.title || articulo.titulo || 'Sin título'}</h1>
            <p className="detalle-conference">
              Enviado a: <span>{conferenceId ? `Conferencia #${conferenceId}` : 'Conferencia sin ID'}</span>
            </p>
          </div>

          <div className="detalle-date-block">
            <p>Fecha de envío:</p>
            <p className="detalle-date-value">{formatearFecha(articulo.createdAt || articulo.fechaEnvio)}</p>
          </div>
        </div>

        <div className="detalle-body">
          {error && (
            <div className="sf-alert-error">{error}</div>
          )}

          <section>
            <h3 className="detalle-section-title">Autores</h3>
            <p className="detalle-authors-box">{autoresTexto}</p>
          </section>

          <section>
            <h3 className="detalle-section-title">Resumen (Abstract)</h3>
            <p className="detalle-abstract">{articulo.abstract || articulo.resumen || 'Sin resumen'}</p>
          </section>

          <section>
            <h3 className="detalle-section-title">Archivos de la Conferencia</h3>
            {archivos.length > 0 ? (
              <div>
                {archivos.map((file) => (
                  <div key={file.id || file.fileId} className="detalle-file-row">
                    <div className="detalle-file-info">
                      <svg className="detalle-file-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="detalle-file-name">{file.originalFileName || file.name || 'archivo'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEliminarArchivo(file.id || file.fileId)}
                      className="detalle-file-delete"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="detalle-empty">No hay archivos registrados para esta conferencia.</p>
            )}
          </section>

          <section>
            <h3 className="detalle-section-title">Evaluar Artículo</h3>
            <form onSubmit={handleEvaluar} className="detalle-eval-form">
              <div>
                <label className="sf-label" htmlFor="eval-status">Estado</label>
                <select
                  id="eval-status"
                  value={evaluacion.status}
                  onChange={(e) => setEvaluacion((prev) => ({ ...prev, status: e.target.value }))}
                  className="sf-select"
                >
                  <option value="ACCEPTED">Aceptar</option>
                  <option value="REJECTED">Rechazar</option>
                  <option value="IN_REVIEW">Dejar en revisión</option>
                </select>
              </div>
              <div>
                <label className="sf-label" htmlFor="eval-comments">Comentarios</label>
                <textarea
                  id="eval-comments"
                  value={evaluacion.comments}
                  onChange={(e) => setEvaluacion((prev) => ({ ...prev, comments: e.target.value }))}
                  rows="3"
                  className="sf-textarea"
                  placeholder="Comentario para la evaluación del artículo"
                />
              </div>
              <button type="submit" className="detalle-eval-submit">
                Guardar evaluación
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetalleArticulo;
