import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/components/editar-conferencia.css';

const EditarConferencia = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    imagen: '',
    categoria: '',
    precio: '',
    ponente: ''
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData({
        titulo: 'DevOps & Microservicios Summit 2026',
        descripcion: 'El Summit anual de DevOps reúne a más de 5,000 profesionales de la tecnología de toda Latinoamérica.',
        fecha: '2026-05-15',
        lugar: 'Bogotá, Colombia (Híbrido)',
        imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        categoria: 'Tecnología',
        precio: '150',
        ponente: 'Ing. Sarah Johnson'
      });
      setCargando(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGuardando(true);
    setTimeout(() => {
      console.log(`Conferencia ${id} actualizada con:`, formData);
      setGuardando(false);
      setExito(true);
      setTimeout(() => {
        navigate(`/conferencia/${id}`);
      }, 2000);
    }, 1500);
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
          <p className="editar-subtitle">Estás modificando el evento #{id}.</p>
        </div>
        <button type="button" className="editar-btn-danger">
          Eliminar Evento
        </button>
      </div>

      <div className="editar-card">
        {exito && (
          <div className="editar-alert-success">
            <p>¡Los cambios se han guardado exitosamente!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="editar-form">
          <div>
            <label className="sf-label" htmlFor="edit-titulo">Título de la Conferencia *</label>
            <input
              id="edit-titulo"
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="sf-input"
            />
          </div>

          <div>
            <label className="sf-label" htmlFor="edit-desc">Descripción corta *</label>
            <textarea
              id="edit-desc"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="3"
              className="sf-textarea"
            />
          </div>

          <div className="editar-grid">
            <div>
              <label className="sf-label" htmlFor="edit-fecha">Fecha del evento *</label>
              <input
                id="edit-fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-lugar">Lugar o Modalidad *</label>
              <input
                id="edit-lugar"
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-cat">Categoría *</label>
              <select
                id="edit-cat"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="sf-select"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Medicina">Medicina</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Diseño">Diseño</option>
                <option value="Negocios">Negocios</option>
              </select>
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-precio">Precio (USD) *</label>
              <input
                id="edit-precio"
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-ponente">Ponente Principal *</label>
              <input
                id="edit-ponente"
                type="text"
                name="ponente"
                value={formData.ponente}
                onChange={handleChange}
                required
                className="sf-input"
              />
            </div>
            <div>
              <label className="sf-label" htmlFor="edit-img">URL de la Imagen (Portada)</label>
              <input
                id="edit-img"
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="sf-input"
              />
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
    </div>
  );
};

export default EditarConferencia;
