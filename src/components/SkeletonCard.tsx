import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-img skeleton-animation"></div>
      <div className="skeleton-tag skeleton-animation"></div>
      <div className="skeleton-title skeleton-animation"></div>
      <div className="skeleton-title skeleton-animation" style={{ width: '80%' }}></div>
      <div className="skeleton-rating skeleton-animation"></div>
      <div className="skeleton-footer">
        <div className="skeleton-price skeleton-animation"></div>
        <div className="skeleton-btn skeleton-animation"></div>
      </div>
    </div>
  );
};
