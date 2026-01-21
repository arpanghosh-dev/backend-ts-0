import { Router } from 'express';
import * as userController from '../../controllers/user.controller';

const router = Router();

// /api/v1/users
router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.get('/email/:email', userController.getByEmail);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

// Adoption management routes
router.post('/:userId/adopt/:petId', userController.adoptPet);
router.post('/:userId/return/:petId', userController.returnPet);

export default router;
