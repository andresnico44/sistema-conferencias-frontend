import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/components/crear-conferencia.css';

const CrearConferencia = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    virtual: false,
    inscriptionPrice: '0',
    startDate: '',
    endDate: '',
    submissionDeadline: '',
    state: 'PUBLISHED',
    categoria: 'Tecnología',
    ponentes: ''
  });

  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      setError('La fecha de finalización no puede ser menor que la fecha de inicio.');
      return;
    }
    if (formData.submissionDeadline && formData.startDate && formData.submissionDeadline > formData.startDate) {
      setError('La fecha límite de envío no puede ser posterior al inicio del evento.');
      return;
    }

    setCargando(true);
    setError('');
    setExito(false);

    try {
      await apiService.crearConferencia({
        name: formData.name,
        description: formData.description,
        location: formData.location,
        virtual: formData.virtual,
        inscriptionPrice: Number(formData.inscriptionPrice),
        startDate: formData.startDate,
        endDate: formData.endDate,
        submissionDeadline: formData.submissionDeadline,
        state: formData.state
      });
      setExito(true);
      setTimeout(() => {
        navigate('/conferencias');
      }, 2000);
    } catch (err) {
      setError(err.message || 'No fue posible crear la conferencia.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="crear-conferencia-container">
      <div className="crear-conferencia-header">
        <Link to="/conferencias" className="crear-conferencia-back-link">
          ← Volver a conferencias
        </Link>
        <h1 className="crear-conferencia-title">Crear Nueva Conferencia</h1>
        <p className="crear-conferencia-subtitle">Completa los detalles para publicar un nuevo evento en la plataforma.</p>
      </div>

      <div className="crear-conferencia-card">
        {exito && (
          <div className="crear-conferencia-alert crear-conferencia-alert-success">
            <p className="crear-conferencia-alert-content">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ¡Conferencia creada exitosamente! Redirigiendo al catálogo...
            </p>
          </div>
        )}
        {error && (
          <div className="crear-conferencia-alert crear-conferencia-alert-error">
            <p className="crear-conferencia-alert-content">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="crear-conferencia-form">
          <div className="crear-conferencia-field">
            <label>Nombre de la conferencia *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej. Conferencia IA 2026" className="crear-conferencia-input" />
          </div>

          <div className="crear-conferencia-field">
            <label>Descripción *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" placeholder="Evento sobre IA aplicada" className="crear-conferencia-textarea"></textarea>
          </div>

          <div className="crear-conferencia-grid">
            <div className="crear-conferencia-field">
              <label>Ubicación *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Ej. Bogota" className="crear-conferencia-input" />
            </div>

            <div className="crear-conferencia-field">
              <label>Precio de inscripción (USD) *</label>
              <input type="number" name="inscriptionPrice" value={formData.inscriptionPrice} onChange={handleChange} required min="0" step="0.01" className="crear-conferencia-input" />
            </div>

            <div className="crear-conferencia-field">
              <label>Fecha de inicio *</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="crear-conferencia-input" />
            </div>

            <div className="crear-conferencia-field">
              <label>Fecha de finalización *</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required min={formData.startDate || undefined} className="crear-conferencia-input" />
            </div>

            <div className="crear-conferencia-field">
              <label>Fecha límite de envío *</label>
              <input type="date" name="submissionDeadline" value={formData.submissionDeadline} onChange={handleChange} required max={formData.startDate || undefined} className="crear-conferencia-input" />
            </div>

            <div className="crear-conferencia-field">
              <label>Estado *</label>
              <select name="state" value={formData.state} onChange={handleChange} className="crear-conferencia-select">
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div className="crear-conferencia-field">
              <label>Categoría *</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange} className="crear-conferencia-select">
                <option value="Tecnología">Tecnología</option>
                <option value="Medicina">Medicina</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Diseño">Diseño</option>
                <option value="Negocios">Negocios</option>
              </select>
            </div>

            <div className="crear-conferencia-field">
              <label>Ponentes *</label>
              <input type="text" name="ponentes" value={formData.ponentes} onChange={handleChange} required placeholder="Ej. Dra. Ana Perez, Ing. Carlos Ruiz" className="crear-conferencia-input" />
              <p className="crear-conferencia-field-help">Puedes agregar varios separados por coma.</p>
            </div>

            <div className="crear-conferencia-checkbox-row">
              <label className="crear-conferencia-checkbox-label">
                <input type="checkbox" name="virtual" checked={formData.virtual} onChange={handleChange} />
                Evento virtual
              </label>
            </div>
          </div>

          <div className="crear-conferencia-actions">
            <button type="button" onClick={() => navigate('/conferencias')} className="crear-conferencia-btn crear-conferencia-btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={cargando} className="crear-conferencia-btn crear-conferencia-btn-primary">
              {cargando ? 'Guardando...' : 'Crear Conferencia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearConferencia;