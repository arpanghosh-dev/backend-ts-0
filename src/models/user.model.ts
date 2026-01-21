import { prop, getModelForClass, pre, post, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})

@pre<User>('save', function () {
    console.log(`Saving user: ${this.name}`);
})

@post<User>('save', function (doc) {
    console.log(`User saved: ${doc.name}`);
})

export class User {
    @prop({ required: true, trim: true })
    public name!: string;

    @prop({ required: true, trim: true, unique: true, lowercase: true })
    public email!: string;

    @prop({ required: true, min: 0, max: 150 })
    public age!: number;

    @prop()
    public phone?: string;

    @prop()
    public address?: string;

    @prop({ default: true })
    public canAdopt!: boolean;

    @prop()
    public adoptionRequirements?: string;

    // Array of adopted pet IDs (reference to Pet model)
    @prop({ type: () => [Types.ObjectId], ref: 'Pet', default: [] })
    public adoptedPets!: Types.ObjectId[];

    @prop({ default: 0 })
    public totalAdoptions!: number;

    // Virtual property
    public get isEligibleToAdopt(): boolean {
        return this.canAdopt && this.age >= 18;
    }

    // Instance method
    public getFullInfo(): string {
        return `User: ${this.name}, Email: ${this.email}, Age: ${this.age}, Can Adopt: ${this.canAdopt}`;
    }
}

export const UserModel = getModelForClass(User);