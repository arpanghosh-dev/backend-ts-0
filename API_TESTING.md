# API Testing Guide

## Base URL
```
http://localhost:5000/api
```

---

## 1. Health Check

### Check API Health
```bash
GET http://localhost:5000/api/health
```

---

## 2. User Endpoints

### Create User
```bash
POST http://localhost:5000/api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "phone": "+1234567890",
  "address": "123 Main St, New York",
  "canAdopt": true,
  "adoptionRequirements": "Has a backyard and experience with dogs"
}
```

### Create Another User
```bash
POST http://localhost:5000/api/v1/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 30,
  "phone": "+0987654321",
  "address": "456 Oak Ave, Los Angeles",
  "canAdopt": true
}
```

### Get All Users
```bash
GET http://localhost:5000/api/v1/users
```

### Get User by ID
```bash
GET http://localhost:5000/api/v1/users/{USER_ID}
```

### Get User by Email
```bash
GET http://localhost:5000/api/v1/users/email/john@example.com
```

### Update User
```bash
PUT http://localhost:5000/api/v1/users/{USER_ID}
Content-Type: application/json

{
  "age": 26,
  "phone": "+1111111111",
  "canAdopt": true
}
```

### Delete User
```bash
DELETE http://localhost:5000/api/v1/users/{USER_ID}
```

---

## 3. Pet Endpoints

### Create Pet - Dog
```bash
POST http://localhost:5000/api/v1/pets
Content-Type: application/json

{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "gender": "Male",
  "color": "Golden",
  "adoptable": true,
  "description": "Friendly and energetic dog, loves to play fetch"
}
```

### Create Pet - Cat
```bash
POST http://localhost:5000/api/v1/pets
Content-Type: application/json

{
  "name": "Whiskers",
  "species": "Cat",
  "breed": "Persian",
  "age": 2,
  "gender": "Female",
  "color": "White",
  "adoptable": true,
  "description": "Calm and affectionate cat"
}
```

### Create Pet - Bird
```bash
POST http://localhost:5000/api/v1/pets
Content-Type: application/json

{
  "name": "Tweety",
  "species": "Bird",
  "breed": "Canary",
  "age": 1,
  "gender": "Unknown",
  "color": "Yellow",
  "adoptable": true,
  "description": "Beautiful singing bird"
}
```

### Get All Pets
```bash
GET http://localhost:5000/api/v1/pets
```

### Get Adoptable Pets Only
```bash
GET http://localhost:5000/api/v1/pets/adoptable
```

### Get Pet by ID
```bash
GET http://localhost:5000/api/v1/pets/{PET_ID}
```

### Update Pet
```bash
PUT http://localhost:5000/api/v1/pets/{PET_ID}
Content-Type: application/json

{
  "age": 4,
  "description": "Very friendly and well-trained dog"
}
```

### Delete Pet
```bash
DELETE http://localhost:5000/api/v1/pets/{PET_ID}
```

---

## 4. Adoption Workflows

### Scenario 1: User Adopts Pet (via User Route)

#### Step 1: Create User
```bash
POST http://localhost:5000/api/v1/users
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "canAdopt": true
}
```
**Save the returned `_id` as USER_ID**

#### Step 2: Create Pet
```bash
POST http://localhost:5000/api/v1/pets
Content-Type: application/json

{
  "name": "Max",
  "species": "Dog",
  "breed": "Labrador",
  "age": 2,
  "gender": "Male",
  "color": "Black",
  "adoptable": true
}
```
**Save the returned `_id` as PET_ID**

#### Step 3: User Adopts Pet
```bash
POST http://localhost:5000/api/v1/users/{USER_ID}/adopt/{PET_ID}
```

#### Step 4: Verify Adoption - Check User
```bash
GET http://localhost:5000/api/v1/users/{USER_ID}
```
**Should show pet in `adoptedPets` array and `totalAdoptions: 1`**

#### Step 5: Verify Adoption - Check Pet
```bash
GET http://localhost:5000/api/v1/pets/{PET_ID}
```
**Should show `adoptedBy: USER_ID`, `adoptable: false`, and `adoptionDate`**

---

### Scenario 2: Adopt Pet (via Pet Route)

#### Adopt Pet Directly
```bash
POST http://localhost:5000/api/v1/pets/{PET_ID}/adopt/{USER_ID}
```

---

### Scenario 3: Return Pet

#### Option A: Return via User Route
```bash
POST http://localhost:5000/api/v1/users/{USER_ID}/return/{PET_ID}
```

#### Option B: Return via Pet Route
```bash
POST http://localhost:5000/api/v1/pets/{PET_ID}/return
```

#### Verify Return - Check Pet
```bash
GET http://localhost:5000/api/v1/pets/{PET_ID}
```
**Should show `adoptedBy: null`, `adoptable: true`, and user in `previousOwners`**

---

## 5. Advanced Queries

### Filter Pets by Species (Query Parameter)
```bash
GET http://localhost:5000/api/v1/pets?species=Dog
```

### Filter Pets by Adoptable Status
```bash
GET http://localhost:5000/api/v1/pets?adoptable=true
```

### Filter Users by Age
```bash
GET http://localhost:5000/api/v1/users?age=25
```

---

## 6. Testing with cURL

### Create User
```bash
curl -X POST http://localhost:5000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Wilson",
    "email": "bob@example.com",
    "age": 35,
    "canAdopt": true
  }'
```

### Create Pet
```bash
curl -X POST http://localhost:5000/api/v1/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luna",
    "species": "Cat",
    "age": 1,
    "gender": "Female",
    "color": "Gray",
    "adoptable": true
  }'
```

### Adopt Pet
```bash
curl -X POST http://localhost:5000/api/v1/users/USER_ID/adopt/PET_ID
```

### Get All Users
```bash
curl http://localhost:5000/api/v1/users
```

### Get All Pets
```bash
curl http://localhost:5000/api/v1/pets
```

---

## 7. Expected Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Success with Count
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 8. Common Error Scenarios

### Duplicate Email
```bash
POST http://localhost:5000/api/v1/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "john@example.com",  # Already exists
  "age": 25
}

# Response: 400 Bad Request
{
  "success": false,
  "message": "Email already exists"
}
```

### User Not Found
```bash
GET http://localhost:5000/api/v1/users/invalid_id

# Response: 404 Not Found
{
  "success": false,
  "message": "User not found"
}
```

### Pet Not Found
```bash
GET http://localhost:5000/api/v1/pets/invalid_id

# Response: 404 Not Found
{
  "success": false,
  "message": "Pet not found"
}
```

---

## 9. Complete Test Flow

```bash
# 1. Create a user
POST /api/v1/users
{
  "name": "Test User",
  "email": "test@example.com",
  "age": 25,
  "canAdopt": true
}

# 2. Create multiple pets
POST /api/v1/pets (Dog)
POST /api/v1/pets (Cat)
POST /api/v1/pets (Bird)

# 3. Get all adoptable pets
GET /api/v1/pets/adoptable

# 4. User adopts first pet
POST /api/v1/users/{userId}/adopt/{petId1}

# 5. User adopts second pet
POST /api/v1/users/{userId}/adopt/{petId2}

# 6. Check user's adopted pets
GET /api/v1/users/{userId}

# 7. Return one pet
POST /api/v1/users/{userId}/return/{petId1}

# 8. Verify pet is adoptable again
GET /api/v1/pets/adoptable

# 9. Check previous owners
GET /api/v1/pets/{petId1}
```

---

## 10. Postman Collection

Import this into Postman for easy testing:

```json
{
  "info": {
    "name": "Pet Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    }
  ]
}
```
