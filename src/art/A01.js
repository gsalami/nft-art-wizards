import React from "react";
import Sketch from "react-p5";

const A01 = () => {
  let hue;
  const rings = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    hue = p5.random(0, 360);
    const count = p5.floor(p5.random(10, 20));
    for (let i = 0; i < count; i++) {
      const diameter = ((i + 1) / count);
      const arcLength = p5.random(p5.PI * 0.05, p5.PI * 2);
      const arcAngle = p5.random(-p5.PI * 2, p5.PI * 2);
      const spinSpeed = p5.random(-1, 1);
      rings.push({
        spinSpeed,
        diameter,
        arcLength,
        arcAngle
      });
    }
  };

  const draw = (p5) => {
    p5.background(0);

    const minDim = Math.min(p5.width, p5.height);
    
    p5.noFill();
    p5.strokeWeight(minDim * 0.005);
    p5.strokeCap(p5.ROUND);
    p5.stroke(255);

    let d = minDim;
    d -= d * 0.25;
    
    for (let i = 0; i < rings.length; i++) {
      const {
        diameter,
        arcLength,
        arcAngle,
        spinSpeed
      } = rings[i];
      const spin = p5.millis() / 1000 * spinSpeed;
      p5.arc(
        p5.width / 2,
        p5.height / 2,
        diameter * d,
        diameter * d,
        spin + arcAngle,
        spin + arcAngle + p5.PI * arcLength
      );
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;

};

export default A01;
