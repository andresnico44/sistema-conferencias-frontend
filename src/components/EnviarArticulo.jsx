import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/components/enviar-articulo.css';

const EnviarArticulo = () => {
  const { conferenciaId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    autores: '',
  });

  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!archivo) {
      setError('Por favor, adjunta un archivo en formato PDF o Word.');
      return;
    }

    setCargando(true);

    try {
      const conferenceIdNum = Number(conferenciaId);
      if (!Number.isFinite(conferenceIdNum) || conferenceIdNum <= 0) {
        throw new Error('El ID de la conferencia no es válido.');
      }

      const payloadPaper = {
        title: formData.titulo,
        abstract: formData.resumen,
        authors: formData.autores.split(',').map((autor) => autor.trim()).filter(Boolean),
        conferenceId: conferenceIdNum
      };

      const paperCreado = await apiService.crearPaper(payloadPaper);
      await apiService.subirArchivoConferencia(conferenceIdNum, archivo);

      setExito(true);
      setTimeout(() => {
        navigate(`/articulo/${paperCreado?.id || paperCreado?.paperId || 'nuevo'}`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'No se pudo enviar el artículo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="enviar-page">
      <div className="enviar-header">
        <Link to={`/conferencia/${conferenciaId}`} className="enviar-back">
          ← Volver a la conferencia
        </Link>
        <h1 className="enviar-title">Enviar Artículo / Ponencia</h1>
        <p className="enviar-subtitle">Sube tu propuesta para la conferencia #{conferenciaId}.</p>
      </div>

      <div className="enviar-card">
        {exito && (
          <div className="enviar-alert-success">
            ¡Tu artículo ha sido enviado con éxito para revisión!
          </div>
        )}
        {error && (
          <div className="enviar-alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="enviar-form">
          <div>
            <label className="sf-label" htmlFor="enviar-titulo">Título del Artículo *</label>
            <input
              id="enviar-titulo"
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="sf-input"
            />
          </div>

          <div>
            <label className="sf-label" htmlFor="enviar-autores">Autores (separados por coma) *</label>
            <input
              id="enviar-autores"
              type="text"
              name="autores"
              value={formData.autores}
              onChange={handleChange}
              required
              placeholder="Ej. Nicole Angarita, Andrés Niño"
              className="sf-input"
            />
          </div>

          <div>
            <label className="sf-label" htmlFor="enviar-resumen">Resumen (Abstract) *</label>
            <textarea
              id="enviar-resumen"
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              required
              rows="4"
              className="sf-textarea"
            />
          </div>

          <div>
            <label className="sf-label" htmlFor="enviar-file">Documento Adjunto (PDF, DOCX) *</label>
            <div className="enviar-upload-wrap">
              <label className="enviar-dropzone">
                <div className="enviar-dropzone-inner">
                  <svg className="enviar-upload-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="enviar-dropzone-hint">
                    <strong>Haz clic para subir</strong> o arrastra y suelta
                  </p>
                  <p className="enviar-dropzone-note">PDF, DOC, DOCX (Max. 10MB)</p>
                </div>
                <input
                  id="enviar-file"
                  type="file"
                  className="enviar-file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {archivo && (
              <div className="enviar-file-name">
                <svg className="enviar-file-check" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Archivo seleccionado: {archivo.name}
              </div>
            )}
          </div>

          <div className="enviar-actions">
            <button type="submit" disabled={cargando} className="enviar-submit">
              {cargando ? 'Subiendo documento...' : 'Enviar Artículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnviarArticulo;
