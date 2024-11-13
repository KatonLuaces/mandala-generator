// src/app/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import MandalaImage from './components/MandalaImage';

const nouns = ["sea shells", "green chiles", "love", "mom", "smooth stones", "poetry", "art", "leadership", "community"];

const HomePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getRandomNoun = () => nouns[Math.floor(Math.random() * nouns.length)];

  const generateMandala = async () => {
    setLoading(true); // Show loading indicator
    try {
      const randomNoun = getRandomNoun();
      const response = await fetch(`/api/generateMandala?prompt=${encodeURIComponent(randomNoun)}`);
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating mandala:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Trigger mandala generation on page load
  useEffect(() => {
    generateMandala();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button onClick={generateMandala} disabled={loading} style={{ margin: '20px' }}>
        {loading ? "Generating..." : "Generate New Mandala"}
      </button>
      
      {loading && (
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
        </div>
      )}
      
      {imageUrl && !loading && <MandalaImage imageUrl={imageUrl} />}
    </div>
  );
};

export default HomePage;