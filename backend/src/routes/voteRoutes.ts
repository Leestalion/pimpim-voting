import express from 'express';
import { voteController } from '../controllers';

const router = express.Router();

router.post('/trip/:id/vote', voteController.vote);

export default router;