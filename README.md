# Pet Management System API

A RESTful API for managing pets and users with adoption functionality, built with Node.js, TypeScript, Express, MongoDB, and Typegoose.

## Project Structure

```
src/
├── config/
│   └── db.ts                 # Database configuration
├── controllers/
│   ├── health.controller.ts  # Health check endpoint
│   ├── pet.controller.ts     # Pet CRUD & adoption controllers
│   └── user.controller.ts    # User CRUD & adoption controllers
├── models/
│   ├── pet.model.ts          # Pet Mongoose schema
│   └── user.model.ts         # User Typegoose model
├── routes/
│   ├── index.ts              # Main router
│   └── v1/
│       ├── index.ts          # V1 API router
│       ├── pet.routes.ts     # Pet-specific routes
│       └── user.routes.ts    # User-specific routes
├── services/
│   ├── pet.service.ts        # Pet business logic
│   └── user.service.ts       # User business logic
├── app.ts                    # Express app configuration
└── server.ts                 # Server entry point
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API health status

### User Management (v1)
Base URL: `/api/v1/users`

#### CRUD Operations
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - Get all users (with populated adopted pets)
- `GET /api/v1/users/:id` - Get a specific user by ID
- `GET /api/v1/users/email/:email` - Get user by email
- `PUT /api/v1/users/:id` - Update a user by ID
- `DELETE /api/v1/users/:id` - Delete a user by ID

#### Adoption Management
- `POST /api/v1/users/:userId/adopt/:petId` - User adopts a pet
- `POST /api/v1/users/:userId/return/:petId` - User returns a pet

### Pet Management (v1)
Base URL: `/api/v1/pets`

#### CRUD Operations
- `POST /api/v1/pets` - Create a new pet
- `GET /api/v1/pets` - Get all pets (with populated owner info)
- `GET /api/v1/pets/adoptable` - Get all adoptable pets
- `GET /api/v1/pets/:id` - Get a specific pet by ID
- `PUT /api/v1/pets/:id` - Update a pet by ID
- `DELETE /api/v1/pets/:id` - Delete a pet by ID

#### Adoption Management
- `POST /api/v1/pets/:petId/adopt/:userId` - Adopt a pet to a user
- `POST /api/v1/pets/:petId/return` - Return an adopted pet

## Data Models

### User Model (Typegoose)

```typescript
{
  name: string;                    // Required
  email: string;                   // Required, unique, lowercase
  age: number;                     // Required (0-150)
  phone?: string;                  // Optional
  address?: string;                // Optional
  canAdopt: boolean;               // Default: true
  adoptionRequirements?: string;   // Optional
  adoptedPets: ObjectId[];         // Array of Pet IDs
  totalAdoptions: number;          // Default: 0
  createdAt: Date;                 // Auto-generated
  updatedAt: Date;                 // Auto-generated
}

// Virtual Properties
isEligibleToAdopt: boolean         // canAdopt && age >= 18

// Instance Methods
getFullInfo(): string              // Returns formatted user info
```

### Pet Model (Mongoose)

```typescript
{
  name: string;                    // Required
  species: string;                 // Required (e.g., Dog, Cat, Bird)
  breed?: string;                  // Optional
  age: number;                     // Required
  gender: 'Male' | 'Female' | 'Unknown';  // Default: 'Unknown'
  color: string;                   // Required
  adoptable: boolean;              // Default: true
  description?: string;            // Optional
  imageUrl?: string;               // Optional
  adoptedBy?: ObjectId;            // Reference to User
  adoptionDate?: Date;             // Date when adopted
  previousOwners?: ObjectId[];     // Array of previous User IDs
  createdAt: Date;                 // Auto-generated
  updatedAt: Date;                 // Auto-generated
}

// Virtual Properties
displayName: string                // "Name (Species)"
isAdopted: boolean                 // Whether pet has an owner

// Instance Methods
getPetInfo(): string               // Returns formatted pet info

// Static Methods
findAdoptable()                    // Find all adoptable pets
findBySpecies(species: string)     // Find pets by species
```

## API Request/Response Examples

### User Endpoints

#### Create User
```bash
POST /api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "phone": "+1234567890",
  "address": "123 Main St",
  "canAdopt": true
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "adoptedPets": [],
    "totalAdoptions": 0,
    ...
  }
}
```

#### Get All Users
```bash
GET /api/v1/users

Response:
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "adoptedPets": [
        { "_id": "...", "name": "Buddy", "species": "Dog" }
      ],
      ...
    }
  ]
}
```

#### User Adopts Pet
```bash
POST /api/v1/users/USER_ID/adopt/PET_ID

Response:
{
  "success": true,
  "message": "Pet adopted successfully",
  "data": {
    "_id": "USER_ID",
    "adoptedPets": ["PET_ID"],
    "totalAdoptions": 1,
    ...
  }
}
```

### Pet Endpoints

#### Create Pet
```bash
POST /api/v1/pets
Content-Type: application/json

{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "gender": "Male",
  "color": "Golden",
  "adoptable": true,
  "description": "Friendly and energetic dog"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Buddy",
    "species": "Dog",
    "adoptable": true,
    "adoptedBy": null,
    ...
  }
}
```

#### Get Adoptable Pets
```bash
GET /api/v1/pets/adoptable

Response:
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "name": "Buddy",
      "species": "Dog",
      "adoptable": true,
      "adoptedBy": null
    }
  ]
}
```

#### Adopt Pet
```bash
POST /api/v1/pets/PET_ID/adopt/USER_ID

Response:
{
  "success": true,
  "message": "Pet adopted successfully",
  "data": {
    "_id": "PET_ID",
    "name": "Buddy",
    "adoptedBy": "USER_ID",
    "adoptionDate": "2026-01-21T...",
    "adoptable": false,
    ...
  }
}
```

#### Return Pet
```bash
POST /api/v1/pets/PET_ID/return

Response:
{
  "success": true,
  "message": "Pet returned successfully",
  "data": {
    "_id": "PET_ID",
    "adoptedBy": null,
    "adoptable": true,
    "previousOwners": ["USER_ID"],
    ...
  }
}
```

## Adoption Workflow

### Complete Adoption Flow

1. **Create a User**
   ```bash
   POST /api/v1/users
   ```

2. **Create a Pet**
   ```bash
   POST /api/v1/pets
   ```

3. **Check Adoptable Pets**
   ```bash
   GET /api/v1/pets/adoptable
   ```

4. **Adopt Pet (Two Ways)**
   
   **Option A: Via User Route**
   ```bash
   POST /api/v1/users/:userId/adopt/:petId
   ```
   
   **Option B: Via Pet Route**
   ```bash
   POST /api/v1/pets/:petId/adopt/:userId
   ```

5. **View User's Adopted Pets**
   ```bash
   GET /api/v1/users/:userId
   ```

6. **Return Pet (Two Ways)**
   
   **Option A: Via User Route**
   ```bash
   POST /api/v1/users/:userId/return/:petId
   ```
   
   **Option B: Via Pet Route**
   ```bash
   POST /api/v1/pets/:petId/return
   ```

## Relationship Between User and Pet

- **User → Pet**: One-to-Many (A user can adopt multiple pets)
  - `User.adoptedPets` contains array of Pet IDs
  - `User.totalAdoptions` tracks total number of adoptions

- **Pet → User**: Many-to-One (A pet can have one current owner)
  - `Pet.adoptedBy` references current User ID
  - `Pet.previousOwners` tracks all previous owners
  - `Pet.adoptionDate` stores when pet was adopted

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pet-management
```

## Installation & Running

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Features

✅ RESTful API design  
✅ TypeScript for type safety  
✅ API versioning (v1)  
✅ Modular architecture (MVC pattern)  
✅ MongoDB with Mongoose & Typegoose  
✅ User-Pet relationship management  
✅ Adoption tracking system  
✅ Population of related documents  
✅ Virtual properties and instance methods  
✅ Error handling  
✅ CORS enabled  
✅ Security headers with Helmet  
✅ Request logging with Morgan  

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose + Typegoose
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Typegoose Features Used

- **Decorators**: `@prop`, `@modelOptions`, `@pre`, `@post`
- **Hooks**: Pre/Post save middleware
- **Virtual Properties**: Computed properties not stored in DB
- **Instance Methods**: Custom methods on document instances
- **References**: ObjectId references between collections
- **Type Safety**: Full TypeScript support with decorators
