import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const A02 = () => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D(Math.random);
  let t = 0;

  // Words to loop through and current word/letter indices
  const words = ['Wizards', 'of Wisdom', 'get ready', 'to mint'];
  let wordIndex = 0;
  let letterIndex = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const drawPlasma = () => {
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = noise3D(x / 16, y / 16, t / 32) * 0.5 + 0.5;
          data[(x + y * canvas.width) * 4 + 0] = value * 255;
          data[(x + y * canvas.width) * 4 + 1] = value * 255;
          data[(x + y * canvas.width) * 4 + 2] = value * 255;
          data[(x + y * canvas.width) * 4 + 3] = 255;
        }
      }
      t++;
      ctx.putImageData(imageData, 0, 0);

      // Draw text over the noise
      ctx.font = '120px Arial Black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = words[wordIndex].substring(0, letterIndex);
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      // Update letter index or switch to next word
      if (letterIndex < words[wordIndex].length) {
        letterIndex++;
      } else {
        letterIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(() => requestAnimationFrame(drawPlasma), 500); // Add delay here
    };

    drawPlasma();
  }, [noise3D]);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default A02;
