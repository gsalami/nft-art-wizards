import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const A02 = () => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D(Math.random);

  // Create refs for letterIndex, wordIndex, and frameCount
  const letterIndexRef = useRef(0);
  const wordIndexRef = useRef(0);
  const frameCountRef = useRef(0);

  // Create a ref for the time variable
  const timeRef = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const words = ['Wizards', 'of', 'Wisdom', 'spells', 'of wisdom'];
    let word = words[wordIndexRef.current];
    let text = '';

    const drawPlasma = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = noise3D(x / 16, y / 16, timeRef.current / 32) * 0.5 + 0.5;
          data[(x + y * canvas.width) * 4 + 0] = value * 255;
          data[(x + y * canvas.width) * 4 + 1] = value * 255;
          data[(x + y * canvas.width) * 4 + 2] = value * 255;
          data[(x + y * canvas.width) * 4 + 3] = 255;
        }
      }
      timeRef.current++;
      ctx.putImageData(imageData, 0, 0);

      // Draw text over the noise
      ctx.font = '120px Arial Black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Only add the next letter every 10 frames
      if (frameCountRef.current % 10 === 0) {
        if (letterIndexRef.current < word.length) {
          text += word[letterIndexRef.current];
          letterIndexRef.current++;
        } else {
          text = '';
          letterIndexRef.current = 0;
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          word = words[wordIndexRef.current];
        }
      }

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      frameCountRef.current++;
      requestAnimationFrame(drawPlasma);
    };

    drawPlasma();
  }, [noise3D]);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default A02;
