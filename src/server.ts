import app from './app';

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto: ${PORT}`);
});

