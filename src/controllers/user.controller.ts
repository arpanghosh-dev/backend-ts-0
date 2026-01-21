import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const create = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers(req.query);
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(req.params.id as string, req.body);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const adoptPet = async (req: Request, res: Response) => {
    try {
        const { userId, petId } = req.params;
        const user = await userService.addAdoptedPet(userId as string, petId as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Pet adopted successfully', data: user });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const returnPet = async (req: Request, res: Response) => {
    try {
        const { userId, petId } = req.params;
        const user = await userService.removeAdoptedPet(userId as string, petId as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Pet returned successfully', data: user });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};
