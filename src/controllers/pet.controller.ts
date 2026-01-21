import { Request, Response } from 'express';
import * as petService from '../services/pet.service';

export const create = async (req: Request, res: Response) => {
    try {
        const pet = await petService.createPet(req.body);
        res.status(201).json({ success: true, data: pet });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const pets = await petService.getAllPets(req.query);
        res.status(200).json({ success: true, count: pets.length, data: pets });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const pet = await petService.getPetById(req.params.id as string);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const pet = await petService.updatePet(req.params.id as string, req.body);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const pet = await petService.deletePet(req.params.id as string);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAdoptable = async (req: Request, res: Response) => {
    try {
        const pets = await petService.getAdoptablePets();
        res.status(200).json({ success: true, count: pets.length, data: pets });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const adopt = async (req: Request, res: Response) => {
    try {
        const { petId, userId } = req.params;
        const pet = await petService.adoptPet(petId as string, userId as string);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, message: 'Pet adopted successfully', data: pet });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const returnPet = async (req: Request, res: Response) => {
    try {
        const { petId } = req.params;
        const pet = await petService.returnPet(petId as string);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
        }
        res.status(200).json({ success: true, message: 'Pet returned successfully', data: pet });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};
