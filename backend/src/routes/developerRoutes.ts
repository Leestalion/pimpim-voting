import express from 'express';
import { developerController } from '../controllers';

const router = express.Router();

router.post('/verify-password', developerController.verifyPassword);

export default router;