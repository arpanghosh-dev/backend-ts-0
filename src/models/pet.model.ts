import mongoose, { Schema, Document } from 'mongoose';

export interface IPet extends Document {
    name: string;
    species: string;
    breed?: string;
    age: number;
    gender: 'Male' | 'Female' | 'Unknown';
    color: string;
    adoptable: boolean;
    description?: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PetSchema: Schema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Unknown'], default: 'Unknown' },
    color: { type: String, required: true },
    adoptable: { type: Boolean, default: true },
    description: { type: String },
    imageUrl: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IPet>('Pet', PetSchema);