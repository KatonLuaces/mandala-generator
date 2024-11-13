// src/app/components/MandalaImage.tsx
import React from 'react';

interface MandalaImageProps {
  imageUrl: string;
}

const MandalaImage: React.FC<MandalaImageProps> = ({ imageUrl }) => (
  <img src={imageUrl} alt="Mandala Image" style={{ maxWidth: '100%' }} />
);

export default MandalaImage;
