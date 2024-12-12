import express from 'express';
import { tripController } from '../controllers';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);

router.post('/trip', tripController.createTrip);

export default router;