import { UserModel, User } from '../models/user.model';
import { DocumentType } from '@typegoose/typegoose';

export const createUser = async (userData: Partial<User>): Promise<DocumentType<User>> => {
    const user = new UserModel(userData);
    return await user.save();
};

export const getAllUsers = async (filter: any = {}): Promise<DocumentType<User>[]> => {
    return await UserModel.find(filter).populate('adoptedPets');
};

export const getUserById = async (id: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findById(id).populate('adoptedPets');
};

export const getUserByEmail = async (email: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findOne({ email }).populate('adoptedPets');
};

export const updateUser = async (id: string, updateData: Partial<User>): Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true }).populate('adoptedPets');
};

export const deleteUser = async (id: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndDelete(id);
};

export const addAdoptedPet = async (userId: string, petId: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndUpdate(
        userId,
        {
            $addToSet: { adoptedPets: petId },
            $inc: { totalAdoptions: 1 }
        },
        { new: true }
    ).populate('adoptedPets');
};

export const removeAdoptedPet = async (userId: string, petId: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndUpdate(
        userId,
        {
            $pull: { adoptedPets: petId },
            $inc: { totalAdoptions: -1 }
        },
        { new: true }
    ).populate('adoptedPets');
};
