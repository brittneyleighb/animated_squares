const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true, // Enable animation
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    // Fill the background with black
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const cols = 5;
    const rows = 5;
    const gap = width * 0.03;
    const size = width * 0.1;

    // Offset for centering the grid
    const offsetX = (width - (cols * size + (cols - 1) * gap)) / 2;
    const offsetY = (height - (rows * size + (rows - 1) * gap)) / 2;

    // Draw squares with animation
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = offsetX + col * (size + gap);
        const y = offsetY + row * (size + gap);

        // Animate the scaling and opacity
        const scale = Math.sin(time + col * 0.5 + row * 0.5) * 0.5 + 0.5; // Scale oscillates between 0 and 1
        const opacity = Math.sin(time + col * 0.3 + row * 0.3) * 0.5 + 0.5; // Opacity oscillates between 0 and 1

        context.save();
        context.translate(x + size / 2, y + size / 2);
        context.scale(scale, scale);
        context.globalAlpha = opacity;

        // Draw square outline
        context.lineWidth = width * 0.01;
        context.strokeStyle = 'white';
        context.strokeRect(-size / 2, -size / 2, size, size);

        context.restore();
      }
    }
  };
};

canvasSketch(sketch, settings);
