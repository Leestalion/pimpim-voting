import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/trip/:id/user/:id', userController.getUserById);