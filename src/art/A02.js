import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const A02 = () => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D(Math.random);

  // Create refs for letterIndex and wordIndex
  const letterIndexRef = useRef(0);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const words = ['Hello', 'world', 'React', 'JavaScript', 'Coding'];
    let word = words[wordIndexRef.current];
    let text = '';

    const drawPlasma = () => {
      let t = 0;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

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
      ctx.font = '50px Arial Black';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Use .current property to access and modify the values
      if (letterIndexRef.current < word.length) {
        text += word[letterIndexRef.current];
        letterIndexRef.current++;
      } else {
        text = '';
        letterIndexRef.current = 0;
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        word = words[wordIndexRef.current];
      }

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      requestAnimationFrame(drawPlasma);
    };

    drawPlasma();
  }, [noise3D]);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default A02;
