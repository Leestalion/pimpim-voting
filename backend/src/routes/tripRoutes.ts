import express from 'express';
import { tripController } from '../controllers';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);

router.post('/trip', tripController.createTrip);

router.put('/trip', tripController.editTrip);

router.get('/trip/:id', tripController.getTripById);

router.delete('/trip', tripController.deleteTrip);

export default router;