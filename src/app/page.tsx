// src/app/page.tsx

"use client";

import React, { useState, useEffect } from 'react';

const nouns = ["sea shells", "green chiles", "love", "mom", "smooth stones", "poetry", "art", "leadership", "community"];

const HomePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getRandomNoun = () => nouns[Math.floor(Math.random() * nouns.length)];

  const generateMandala = async () => {
    setLoading(true); // Start loading
    try {
      const randomNoun = getRandomNoun();
      const response = await fetch(`/api/generateMandala?prompt=${encodeURIComponent(randomNoun)}`);
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating mandala:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Trigger mandala generation on page load
  useEffect(() => {
    generateMandala();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <div className="mandala-spinner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      ) : (
        imageUrl && (
          <img
            src={imageUrl}
            alt="Mandala Image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )
      )}
    </div>
  );
};

export default HomePage;