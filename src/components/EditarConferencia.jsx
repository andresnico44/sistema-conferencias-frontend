import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/components/editar-conferencia.css';

const EditarConferencia = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    virtual: false,
    inscriptionPrice: '0',
    startDate: '',
    endDate: '',
    submissionDeadline: '',
    topics: '',
    speakers: '',
    state: 'DRAFT'
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarConferencia = async () => {
      setCargando(true);
      setError('');
      try {
        const conf = await apiService.obtenerConferencia(id);
        setFormData({
          name: conf?.name || '',
          description: conf?.description || '',
          location: conf?.location || '',
          virtual: Boolean(conf?.virtual),
          inscriptionPrice: String(conf?.inscriptionPrice ?? '0'),
          startDate: (conf?.startDate || '').slice(0, 10),
          endDate: (conf?.endDate || '').slice(0, 10),
          submissionDeadline: (conf?.submissionDeadline || '').slice(0, 10),
          topics: Array.isArray(conf?.topics) ? conf.topics.join(', ') : '',
          speakers: Array.isArray(conf?.speakers) ? conf.speakers.join(', ') : '',
          state: conf?.state || 'DRAFT',
        });
      } catch (err) {
        setError(err.message || 'No fue posible cargar la conferencia.');
      } finally {
        setCargando(false);
      }
    };
    cargarConferencia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guardando || eliminando) return;
    setError('');
    setExito(false);
    setGuardando(true);

    try {
      await apiService.editarConferencia(id, {
        id,
        name: formData.name,
        description: formData.description,
        location: formData.location,
        virtual: formData.virtual,
        inscriptionPrice: Number(formData.inscriptionPrice || 0),
        startDate: formData.startDate,
        endDate: formData.endDate,
        submissionDeadline: formData.submissionDeadline,
        topics: formData.topics,
        speakers: formData.speakers,
        state: formData.state
      });

      setGuardando(false);
      setExito(true);
      setTimeout(() => {
        navigate(`/conferencia/${id}`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'No fue posible actualizar la conferencia.');
      setGuardando(false);
    }
  };

  const abrirConfirmacionEliminar = () => {
    if (guardando || eliminando) return;
    setMostrarConfirmacionEliminar(true);
  };

  const cerrarConfirmacionEliminar = () => {
    if (eliminando) return;
    setMostrarConfirmacionEliminar(false);
  };

  const confirmarEliminar = async () => {
    if (guardando || eliminando) return;

    setEliminando(true);
    setError('');
    try {
      await apiService.eliminarConferencia(id);
      navigate('/conferencias');
    } catch (err) {
      setError(err.message || 'No fue posible eliminar la conferencia.');
      setEliminando(false);
      setMostrarConfirmacionEliminar(false);
    }
  };

  if (cargando) {
    return (
      <div className="editar-loading">
        <div className="editar-loading-text">Cargando datos de la conferencia...</div>
      </div>
    );
  }

  return (
    <div className="editar-page">
      <div className="editar-header">
        <div>
          <Link to={`/conferencia/${id}`} className="editar-back">
            ← Volver a los detalles
          </Link>
          <h1 className="editar-title">Editar Conferencia</h1>
          <p className="editar-subtitle">Modifica los datos de la conferencia y guarda los cambios.</p>
        </div>
        <button type="button" className="editar-btn-danger" onClick={abrirConfirmacionEliminar} disabled={guardando || eliminando}>
          {eliminando ? 'Eliminando...' : 'Eliminar Evento'}
        </button>
      </div>

      <div className="editar-card">
        {error && (
          <div className="editar-alert-error">
            <p>{error}</p>
          </div>
        )}
        {exito && (
          <div className="editar-alert-success">
            <p>¡Los cambios se han guardado exitosamente!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="editar-form">
          <div>
            <label className="sf-label" htmlFor="edit-name">Nombre *</label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="sf-input"
            />
          </div>

          <div>
            <label className="sf-label" htmlFor="edit-desc">Descripción *</label>
            <textarea
              id="edit-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="sf-textarea"
            />
          </div>

          <div className="editar-grid">
            <div>
              <label className="sf-label" htmlFor="edit-location">Ubicación *</label>
              <input
                id="edit-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-virtual" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Virtual *</span>
                <input
                  id="edit-virtual"
                  type="checkbox"
                  name="virtual"
                  checked={formData.virtual}
                  onChange={handleChange}
                />
                {formData.virtual ? 'Si' : 'No'}
              </label>
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-price">Precio de inscripción *</label>
              <input
                id="edit-price"
                type="number"
                name="inscriptionPrice"
                value={formData.inscriptionPrice}
                onChange={handleChange}
                required
                step="0.01"
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-start-date">Fecha de inicio *</label>
              <input
                id="edit-start-date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-end-date">Fecha de finalización *</label>
              <input
                id="edit-end-date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-submission-deadline">Fecha límite de envío *</label>
              <input
                id="edit-submission-deadline"
                type="date"
                name="submissionDeadline"
                value={formData.submissionDeadline}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-topics">Tópicos o temas *</label>
              <input
                id="edit-topics"
                type="text"
                name="topics"
                value={formData.topics}
                onChange={handleChange}
                required
                placeholder="Ej. IA, Microservicios, DevOps"
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-speakers">Ponente(s) *</label>
              <input
                id="edit-speakers"
                type="text"
                name="speakers"
                value={formData.speakers}
                onChange={handleChange}
                required
                placeholder="Ej. Ana Perez, Luis Gomez"
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-state">Estado *</label>
              <select
                id="edit-state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="sf-select"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
            </div>
          </div>

          <div className="editar-actions">
            <button type="button" onClick={() => navigate(`/conferencia/${id}`)} className="sf-btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={guardando} className="editar-btn-submit">
              {guardando ? 'Guardando Cambios...' : 'Actualizar Conferencia'}
            </button>
          </div>
        </form>
      </div>

      {mostrarConfirmacionEliminar && (
        <div className="editar-modal-overlay" onClick={cerrarConfirmacionEliminar}>
          <div className="editar-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="editar-modal-title">Eliminar conferencia</h3>
            <p className="editar-modal-text">
              Esta acción eliminará la conferencia de forma permanente. ¿Seguro que deseas continuar?
            </p>
            <div className="editar-modal-actions">
              <button
                type="button"
                className="editar-modal-btn editar-modal-btn-cancel"
                onClick={cerrarConfirmacionEliminar}
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="editar-modal-btn editar-modal-btn-danger"
                onClick={confirmarEliminar}
                disabled={eliminando}
              >
                {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarConferencia;
