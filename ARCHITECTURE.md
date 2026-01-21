# Project Architecture

## 📁 Directory Structure

```
node-ts-backend/
│
├── src/
│   ├── config/
│   │   └── db.ts                    # MongoDB connection
│   │
│   ├── models/
│   │   ├── pet.model.ts             # Pet schema (Mongoose)
│   │   └── user.model.ts            # User schema (Typegoose)
│   │
│   ├── services/
│   │   ├── pet.service.ts           # Pet business logic
│   │   └── user.service.ts          # User business logic
│   │
│   ├── controllers/
│   │   ├── health.controller.ts     # Health check
│   │   ├── pet.controller.ts        # Pet request handlers
│   │   └── user.controller.ts       # User request handlers
│   │
│   ├── routes/
│   │   ├── index.ts                 # Main router
│   │   └── v1/
│   │       ├── index.ts             # V1 router aggregator
│   │       ├── pet.routes.ts        # Pet routes
│   │       └── user.routes.ts       # User routes
│   │
│   ├── app.ts                       # Express app setup
│   └── server.ts                    # Server entry point
│
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── nodemon.json                     # Nodemon config
├── README.md                        # Full documentation
├── API_TESTING.md                   # Testing guide
└── QUICK_REFERENCE.md               # Quick reference
```

---

## 🔄 Request Flow

```
Client Request
    ↓
Express App (app.ts)
    ↓
Main Router (routes/index.ts)
    ↓
V1 Router (routes/v1/index.ts)
    ↓
Specific Route (pet.routes.ts / user.routes.ts)
    ↓
Controller (pet.controller.ts / user.controller.ts)
    ↓
Service (pet.service.ts / user.service.ts)
    ↓
Model (pet.model.ts / user.model.ts)
    ↓
MongoDB Database
    ↓
Response back to Client
```

---

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                         MongoDB                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐       ┌──────────────────────┐   │
│  │   users Collection   │       │   pets Collection    │   │
│  ├──────────────────────┤       ├──────────────────────┤   │
│  │ _id                  │       │ _id                  │   │
│  │ name                 │       │ name                 │   │
│  │ email (unique)       │       │ species              │   │
│  │ age                  │       │ breed                │   │
│  │ phone                │       │ age                  │   │
│  │ address              │       │ gender               │   │
│  │ canAdopt             │       │ color                │   │
│  │ adoptionRequirements │       │ adoptable            │   │
│  │ adoptedPets[]  ──────┼──┐    │ description          │   │
│  │ totalAdoptions       │  │    │ imageUrl             │   │
│  │ createdAt            │  │    │ adoptedBy      ◄─────┼───┘
│  │ updatedAt            │  │    │ adoptionDate         │   │
│  └──────────────────────┘  └───►│ previousOwners[]     │   │
│                                  │ createdAt            │   │
│                                  │ updatedAt            │   │
│                                  └──────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Relationships

### User → Pet (One-to-Many)
```
User {
  adoptedPets: [ObjectId, ObjectId, ...]  // References to Pet documents
  totalAdoptions: Number
}
```

### Pet → User (Many-to-One)
```
Pet {
  adoptedBy: ObjectId                     // Reference to current User
  previousOwners: [ObjectId, ObjectId]    // References to previous Users
  adoptionDate: Date
}
```

---

## 🎯 API Versioning Structure

```
/api
├── /health                    # Health check (no version)
└── /v1                        # Version 1 APIs
    ├── /users                 # User endpoints
    │   ├── POST /
    │   ├── GET /
    │   ├── GET /:id
    │   ├── GET /email/:email
    │   ├── PUT /:id
    │   ├── DELETE /:id
    │   ├── POST /:userId/adopt/:petId
    │   └── POST /:userId/return/:petId
    │
    └── /pets                  # Pet endpoints
        ├── POST /
        ├── GET /
        ├── GET /adoptable
        ├── GET /:id
        ├── PUT /:id
        ├── DELETE /:id
        ├── POST /:petId/adopt/:userId
        └── POST /:petId/return
```

---

## 🧩 MVC Architecture

```
┌─────────────────────────────────────────────────────────┐
│                         CLIENT                          │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    ROUTES (Router)                      │
│  • Define endpoints                                     │
│  • Map URLs to controllers                              │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                 CONTROLLERS (Handler)                   │
│  • Handle HTTP requests/responses                       │
│  • Validate input                                       │
│  • Call service layer                                   │
│  • Format responses                                     │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                SERVICES (Business Logic)                │
│  • Core business logic                                  │
│  • Data manipulation                                    │
│  • Call model layer                                     │
│  • Reusable functions                                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  MODELS (Data Layer)                    │
│  • Database schemas                                     │
│  • Data validation                                      │
│  • Virtual properties                                   │
│  • Instance/Static methods                              │
│  • Middleware hooks                                     │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB)                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Middleware Stack

```
Request
  ↓
CORS Middleware
  ↓
Helmet (Security Headers)
  ↓
Morgan (Logging)
  ↓
Express JSON Parser
  ↓
Express URL Encoded Parser
  ↓
Routes
  ↓
Controllers
  ↓
Response
```

---

## 🎨 Design Patterns Used

1. **MVC Pattern**: Separation of concerns
2. **Service Layer Pattern**: Business logic isolation
3. **Repository Pattern**: Data access abstraction
4. **Dependency Injection**: Loose coupling
5. **Middleware Pattern**: Request/response processing
6. **Factory Pattern**: Model creation (Typegoose)

---

## 📊 Data Flow Example: Adopt Pet

```
1. Client Request
   POST /api/v1/users/123/adopt/456

2. Express App
   app.ts receives request

3. Main Router
   routes/index.ts → /api

4. V1 Router
   routes/v1/index.ts → /v1

5. User Routes
   routes/v1/user.routes.ts → /:userId/adopt/:petId

6. User Controller
   controllers/user.controller.ts → adoptPet()
   - Extract userId and petId from params
   - Call service layer

7. User Service
   services/user.service.ts → addAdoptedPet()
   - Update user's adoptedPets array
   - Increment totalAdoptions
   - Populate related pet data

8. User Model (Typegoose)
   models/user.model.ts
   - Pre-save hook logs action
   - Save to database
   - Post-save hook logs completion

9. MongoDB
   - Updates user document
   - Returns updated document

10. Response Chain
    Service → Controller → Client
    {
      "success": true,
      "message": "Pet adopted successfully",
      "data": { ...user with populated pets... }
    }
```
