# BuildCo Backend API

Backend for BuildCo construction company website

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buildco
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`

#### Logout User
- **POST** `/api/auth/logout`

### User Routes

#### Get All Users
- **GET** `/api/users`

#### Get User by ID
- **GET** `/api/users/:id`

#### Update User
- **PUT** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Delete User
- **DELETE** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>`

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```
