import { Router } from 'express';
import * as petController from '../../controllers/pet.controller';

const router = Router();

// /api/v1/pets
router.post('/', petController.create);
router.get('/', petController.getAll);
router.get('/adoptable', petController.getAdoptable);
router.get('/:id', petController.getOne);
router.put('/:id', petController.update);
router.delete('/:id', petController.remove);

// Adoption routes
router.post('/:petId/adopt/:userId', petController.adopt);
router.post('/:petId/return', petController.returnPet);

export default router;
