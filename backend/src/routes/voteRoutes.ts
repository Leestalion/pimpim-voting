import express from 'express';
import { voteController } from '../controllers';

const router = express.Router();

router.post('/trip/vote', voteController.vote);

router.get('/trip/:tripId/votes', voteController.getVotesByTripId);

router.get('/trip/:tripId/vote/:userId', voteController.getVotesByUserId);

export default router;