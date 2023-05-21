import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const A02 = () => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D(Math.random);
  let t = 0;

  // Create refs for letterIndex and wordIndex
  const letterIndexRef = useRef(0);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const words = ['Hello', 'world', 'React', 'JavaScript', 'Coding'];
    let word = words[wordIndexRef.current];
    let text = '';

    const drawPlasma = () => {
      // ... rest of your code ...

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

      // ... rest of your code ...
    };

    drawPlasma();
  }, [noise3D]);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default A02;
