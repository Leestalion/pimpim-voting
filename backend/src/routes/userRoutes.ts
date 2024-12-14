import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/trip/:id/user/:id', userController.getUserById);

router.get('/trip/:id/users', userController.getAllUsersInTrip);

router.post('/trip/user', userController.addUserInTrip);

router.put('/trip/user', userController.updateUser);

export default router;