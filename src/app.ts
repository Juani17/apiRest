import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

export { app }; // 👈 ¡esto es lo importante!
