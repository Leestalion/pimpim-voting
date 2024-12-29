import express, { Application } from 'express';
import cors from 'cors';
import { tripRouter, voteRouter, userRouter, developerRouter } from './routes';
import { errorHandler } from './middleware/middleware';

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api', tripRouter);
app.use('/api', userRouter);
app.use('/api', voteRouter);
app.use('/api', developerRouter);

// Error handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});