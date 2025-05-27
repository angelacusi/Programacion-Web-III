import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Países
export const obtenerPaises = () => api.get('/pais');
export const crearPais = (pais) => api.post('/pais', pais);
export const actualizarPais = (id, pais) => api.put(`/pais/${id}`, pais);
export const eliminarPais = (id) => api.delete(`/pais/${id}`);

// Ciudades
export const obtenerCiudades = () => api.get('/ciudad');
export const crearCiudad = (ciudad) => api.post('/ciudad', ciudad);
export const actualizarCiudad = (id, ciudad) => api.put(`/ciudad/${id}`, ciudad);
export const eliminarCiudad = (id) => api.delete(`/ciudad/${id}`);
