import { Router } from 'express';
import petRoutes from './pet.routes';

const router = Router();

router.use('/pets', petRoutes);

export default router;
