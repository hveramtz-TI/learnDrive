import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './carrusel.css'; // Asegúrate de crear este archivo CSS

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch('/data/vehiculos.json')
      .then(response => response.json())
      .then(data => setVehiculos(data.vehiculos));
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vehiculos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vehiculos.length) % vehiculos.length);
  };

  if (vehiculos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carrusel">
      <button onClick={prevImage}>Prev</button>
      <div className="carrusel-image-container">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={vehiculos[currentIndex].imagenFondo}
            alt={vehiculos[currentIndex].nombre}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
      <button onClick={nextImage}>Next</button>
      <div className="carrusel-indicators">
        {vehiculos.map((_, index) => (
          <motion.span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}