import mongoose, { Schema, Document, Types } from 'mongoose';

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
    // Adoption-related fields
    adoptedBy?: Types.ObjectId; // Reference to User
    adoptionDate?: Date;
    previousOwners?: Types.ObjectId[]; // Array of User IDs
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
    imageUrl: { type: String },
    // Adoption-related fields
    adoptedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    adoptionDate: { type: Date },
    previousOwners: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Add Virtual Properties (not stored in DB)
PetSchema.virtual('displayName').get(function () {
    return `${this.name} (${this.species})`;
});

PetSchema.virtual('isAdopted').get(function () {
    return this.adoptedBy !== null && this.adoptedBy !== undefined;
});

// Add Instance Methods
PetSchema.methods.getPetInfo = function (): string {
    return `Pet: ${this.name}, Species: ${this.species}, Age: ${this.age}, Adoptable: ${this.adoptable}`;
};

// Add Static Methods
PetSchema.statics.findAdoptable = function () {
    return this.find({ adoptable: true, adoptedBy: null });
};

PetSchema.statics.findBySpecies = function (species: string) {
    return this.find({ species });
};

// Add Middleware (Hooks)
PetSchema.pre('save', function () {
    console.log(`Saving pet: ${this.name}`);
});

PetSchema.post('save', function (doc) {
    console.log(`Pet saved: ${doc.name}`);
});


export default mongoose.model<IPet>('Pet', PetSchema);