import { Router } from 'express';
import petRoutes from './pet.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/pets', petRoutes);
router.use('/users', userRoutes);

export default router;
