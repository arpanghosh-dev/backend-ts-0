import Pet, { IPet } from '../models/pet.model';

export const createPet = async (petData: Partial<IPet>): Promise<IPet> => {
    const pet = new Pet(petData);
    return await pet.save();
};

export const getAllPets = async (filter: any = {}): Promise<IPet[]> => {
    return await Pet.find(filter).populate('adoptedBy previousOwners');
};

export const getPetById = async (id: string): Promise<IPet | null> => {
    return await Pet.findById(id).populate('adoptedBy previousOwners');
};

export const updatePet = async (id: string, updateData: Partial<IPet>): Promise<IPet | null> => {
    return await Pet.findByIdAndUpdate(id, updateData, { new: true }).populate('adoptedBy previousOwners');
};

export const deletePet = async (id: string): Promise<IPet | null> => {
    return await Pet.findByIdAndDelete(id);
};

export const getAdoptablePets = async (): Promise<IPet[]> => {
    return await Pet.find({ adoptable: true, adoptedBy: null });
};

export const adoptPet = async (petId: string, userId: string): Promise<IPet | null> => {
    const pet = await Pet.findById(petId);
    if (!pet) return null;

    // If pet was previously adopted, add old owner to previousOwners
    if (pet.adoptedBy) {
        if (!pet.previousOwners) {
            pet.previousOwners = [];
        }
        pet.previousOwners.push(pet.adoptedBy);
    }

    pet.adoptedBy = userId as any;
    pet.adoptionDate = new Date();
    pet.adoptable = false;

    return await pet.save();
};

export const returnPet = async (petId: string): Promise<IPet | null> => {
    return await Pet.findByIdAndUpdate(
        petId,
        {
            adoptedBy: null,
            adoptable: true,
            adoptionDate: undefined
        },
        { new: true }
    ).populate('previousOwners');
};
