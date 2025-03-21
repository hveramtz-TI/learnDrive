import React, { useState, useEffect } from 'react';
import './carrusel.css';

export default function Carrusel() {
  const [indice, setIndice] = useState(0);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch('/data/vehiculos.json')
      .then(response => response.json())
      .then(data => setVehiculos(data.vehiculos))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  const moverCarrusel = (n) => {
    setIndice((indice + n + vehiculos.length) % vehiculos.length);
  };

  return (
    <div className="carrusel">
      {vehiculos.length > 0 && (
        <div className="carrusel-dots">
          <div className="carrusel-item" style={{ backgroundImage: `url(${vehiculos[indice].imagenFondo})` }}>
            <img src={vehiculos[indice].imagen} alt={vehiculos[indice].nombre} className="imagen-vehiculo" />
            <div className='contenedor-botones'>
              <button className="prev" onClick={() => moverCarrusel(-1)}>&#10094;</button>
              <button className="next" onClick={() => moverCarrusel(1)}>&#10095;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}