import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// routes
import { tripRouter, voteRouter, userRouter, developerRouter } from './routes';

app.use('/api', tripRouter);
app.use('/api', userRouter);
app.use('/api', voteRouter);
app.use('/api', developerRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});