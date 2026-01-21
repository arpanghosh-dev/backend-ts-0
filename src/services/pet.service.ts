import Pet, { IPet } from '../models/pet.model';

export const createPet = async (petData: Partial<IPet>): Promise<IPet> => {
    const pet = new Pet(petData);
    return await pet.save();
};

export const getAllPets = async (filter: any = {}): Promise<IPet[]> => {
    return await Pet.find(filter);
};

export const getPetById = async (id: string): Promise<IPet | null> => {
    return await Pet.findById(id);
};

export const updatePet = async (id: string, updateData: Partial<IPet>): Promise<IPet | null> => {
    return await Pet.findByIdAndUpdate(id, updateData, { new: true });
};

export const deletePet = async (id: string): Promise<IPet | null> => {
    return await Pet.findByIdAndDelete(id);
};
