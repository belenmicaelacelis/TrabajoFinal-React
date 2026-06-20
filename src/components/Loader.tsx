import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Cargando productos...' }) => {
  return (
    <div className="loader-container" aria-live="polite">
      <div className="spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
};
