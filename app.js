app.get('/year-progress', (req, res) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const start = new Date(currentYear, 0, 1);
  const end = new Date(currentYear + 1, 0, 1);
  const progress = ((now - start) / (end - start)) * 100;
  const progressFormatted = progress.toFixed(6);
  
  // Default colors
  let backgroundColor = '#e0e0e0'; // light gray
  let progressColor = '#3b82f6'; // blue
  let textColor = '#000'; // black

  // Check for dark mode
  if (req.headers['user-agent'].includes('dark-mode')) {
      backgroundColor = '#333'; // dark gray
      progressColor = '#1e90ff'; // lighter blue
      textColor = '#fff'; // white
  }

  const svg = `
      <svg width="300" height="50" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="50" fill="${backgroundColor}" />
          <rect width="${progressFormatted}%" height="50" fill="${progressColor}" />
          <text x="50%" y="30" alignment-baseline="middle" text-anchor="middle" fill="${textColor}" font-size="12">
              ${progressFormatted}% of ${currentYear} Completed
          </text>
      </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});
