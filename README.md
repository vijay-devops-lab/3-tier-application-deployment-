# BuildCo - Full Stack Application

Complete construction company website with React frontend and Node.js/MySQL backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL database (running via Docker or locally)

### Setup Instructions

#### 1. Start MySQL Database (if using Docker)
```bash
cd db
docker compose up -d
```

#### 2. Setup Backend
```bash
cd backend
npm install
```

Make sure `.env` file exists with correct MySQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=buildco
JWT_SECRET=buildco_secret_key_change_in_production_2026
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Start backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

#### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173

## 🔐 Authentication Flow

1. **First Time Users**: Click "Register" → Create account → Automatically logged in → Redirected to Home
2. **Existing Users**: Click "Login" → Enter credentials → Redirected to Home
3. **Protected Routes**: Home page requires authentication - unauthenticated users redirected to Login
4. **Logout**: Click "Logout" button in navbar → Redirected to Login page

## 📁 Project Structure

```
.
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & error handling
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # ProtectedRoute component
│   │   ├── context/       # AuthContext for state management
│   │   ├── pages/         # Login, Register, Home pages
│   │   ├── router/        # Route configuration
│   │   ├── utils/         # API utility functions
│   │   └── App.jsx
│   └── package.json
│
└── db/                    # Docker MySQL setup
    └── docker-compose.yml
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

## 🛠️ Technologies Used

### Backend
- Node.js & Express
- MySQL & Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- React Router DOM (routing & navigation)
- Context API (state management)
- Tailwind CSS (styling)
- Typed.js (animations)

## 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS configuration
- Input validation

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=buildco
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing the Application

1. Start MySQL, backend, and frontend servers
2. Navigate to http://localhost:5173
3. You'll be redirected to login (home is protected)
4. Click "Create one" to register a new account
5. Fill in the registration form
6. Upon successful registration, you'll be redirected to home
7. Logout and try logging in again
8. Home page now shows your user information

## 📱 Features

- User registration with validation
- Secure login system
- Protected home page (requires authentication)
- Automatic redirect for unauthenticated users
- User profile display
- Logout functionality
- Responsive design
- Error handling and user feedback

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify port 5000 is not in use

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API URL in `frontend/src/utils/api.js`

**Database errors:**
- Check MySQL connection
- Verify database 'buildco' exists
- Check user permissions

## 📄 License

MIT
