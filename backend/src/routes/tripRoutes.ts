import express from 'express';
import { tripController } from '../controllers';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);

router.post('/trip', tripController.createTrip);

router.get('/trip/:id', tripController.getTripById);

export default router;