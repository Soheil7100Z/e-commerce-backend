import app from './app.js';
const PORT = 3300;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
