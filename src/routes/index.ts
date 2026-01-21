import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

import v1Routes from './v1';

const router = Router();

router.get('/health', healthCheck);
router.use('/v1', v1Routes);

export default router;
