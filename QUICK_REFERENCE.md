# Quick Reference - Pet Management API

## 🚀 Quick Start

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## 📋 API Endpoints Summary

### Users (`/api/v1/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create user |
| GET | `/` | Get all users |
| GET | `/:id` | Get user by ID |
| GET | `/email/:email` | Get user by email |
| PUT | `/:id` | Update user |
| DELETE | `/:id` | Delete user |
| POST | `/:userId/adopt/:petId` | User adopts pet |
| POST | `/:userId/return/:petId` | User returns pet |

### Pets (`/api/v1/pets`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create pet |
| GET | `/` | Get all pets |
| GET | `/adoptable` | Get adoptable pets |
| GET | `/:id` | Get pet by ID |
| PUT | `/:id` | Update pet |
| DELETE | `/:id` | Delete pet |
| POST | `/:petId/adopt/:userId` | Adopt pet to user |
| POST | `/:petId/return` | Return pet |

---

## 📝 Quick Examples

### Create User
```bash
POST http://localhost:5000/api/v1/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "canAdopt": true
}
```

### Create Pet
```bash
POST http://localhost:5000/api/v1/pets
{
  "name": "Buddy",
  "species": "Dog",
  "age": 3,
  "gender": "Male",
  "color": "Golden",
  "adoptable": true
}
```

### Adopt Pet
```bash
POST http://localhost:5000/api/v1/users/{userId}/adopt/{petId}
```

---

## 🔗 Relationships

**User ↔ Pet**
- User has `adoptedPets[]` (array of Pet IDs)
- Pet has `adoptedBy` (User ID)
- Pet tracks `previousOwners[]`

---

## 📦 Models

### User Fields
- `name`, `email`, `age`, `phone`, `address`
- `canAdopt`, `adoptionRequirements`
- `adoptedPets[]`, `totalAdoptions`

### Pet Fields
- `name`, `species`, `breed`, `age`, `gender`, `color`
- `adoptable`, `description`, `imageUrl`
- `adoptedBy`, `adoptionDate`, `previousOwners[]`

---

## ⚡ Key Features

✅ Full CRUD for Users & Pets  
✅ Typegoose for User model  
✅ Mongoose for Pet model  
✅ Bidirectional adoption relationship  
✅ Population of related documents  
✅ Virtual properties & instance methods  
✅ Pre/Post save hooks  
✅ API versioning (v1)  

---

## 🛠️ Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **MongoDB** + **Mongoose** + **Typegoose**
- **Helmet** + **CORS** + **Morgan**
