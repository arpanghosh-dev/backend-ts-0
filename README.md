# Pet Management System API

A RESTful API for managing pets built with Node.js, TypeScript, Express, and MongoDB.

## Project Structure

```
src/
├── config/
│   └── db.ts                 # Database configuration
├── controllers/
│   ├── health.controller.ts  # Health check endpoint
│   └── pet.controller.ts     # Pet CRUD controllers
├── models/
│   └── pet.model.ts          # Pet Mongoose schema
├── routes/
│   ├── index.ts              # Main router
│   └── v1/
│       ├── index.ts          # V1 API router
│       └── pet.routes.ts     # Pet-specific routes
├── services/
│   └── pet.service.ts        # Pet business logic
├── app.ts                    # Express app configuration
└── server.ts                 # Server entry point
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API health status

### Pet Management (v1)
Base URL: `/api/v1/pets`

- `POST /api/v1/pets` - Create a new pet
- `GET /api/v1/pets` - Get all pets (supports query filters)
- `GET /api/v1/pets/:id` - Get a specific pet by ID
- `PUT /api/v1/pets/:id` - Update a pet by ID
- `DELETE /api/v1/pets/:id` - Delete a pet by ID

## Pet Model Schema

```typescript
{
  name: string;           // Required
  species: string;        // Required (e.g., Dog, Cat, Bird)
  breed?: string;         // Optional
  age: number;            // Required
  gender: 'Male' | 'Female' | 'Unknown';  // Default: 'Unknown'
  color: string;          // Required
  adoptable: boolean;     // Default: true
  description?: string;   // Optional
  imageUrl?: string;      // Optional
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-generated
}
```

## API Request/Response Examples

### Create Pet
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
    ...
  }
}
```

### Get All Pets
```bash
GET /api/v1/pets

Response:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Get Pet by ID
```bash
GET /api/v1/pets/:id

Response:
{
  "success": true,
  "data": {...}
}
```

### Update Pet
```bash
PUT /api/v1/pets/:id
Content-Type: application/json

{
  "age": 4,
  "adoptable": false
}

Response:
{
  "success": true,
  "data": {...}
}
```

### Delete Pet
```bash
DELETE /api/v1/pets/:id

Response:
{
  "success": true,
  "message": "Pet deleted successfully"
}
```

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
✅ MongoDB with Mongoose ODM  
✅ Error handling  
✅ CORS enabled  
✅ Security headers with Helmet  
✅ Request logging with Morgan  

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Security**: Helmet, CORS
- **Logging**: Morgan
