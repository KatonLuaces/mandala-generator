'use client'

import React, { useState } from 'react';
import MandalaImage from './components/MandalaImage';

const HomePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateMandala = async () => {
    try {
      const response = await fetch('/api/generateMandala');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating mandala:', error);
    }
  };

  return (
    <div>
      <h1>Random Mandala Generator</h1>
      <button onClick={generateMandala}>Generate Mandala</button>
      {imageUrl && <MandalaImage imageUrl={imageUrl} />}
    </div>
  );
};

export default HomePage;