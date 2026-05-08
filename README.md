# PrimeTrade - Task Management API

A task management REST API built with Express, Prisma, and MySQL. Includes JWT authentication, role-based access control, and a React dashboard.

## Features

- User authentication with JWT tokens
- Role-based access (Admin/User)
- Task CRUD operations with filtering
- Search & filter tasks by status or title
- Pagination support
- Input validation and error handling
- Security middleware (rate limiting, helmet, CORS)
- Swagger API documentation

## Tech Stack

**Backend**
- Node.js & Express.js
- Prisma ORM
- MySQL
- JWT Authentication
- bcryptjs for password hashing

**Frontend**
- React 18 with Vite
- React Router
- Axios
- Context API for state management

## Quick Start

### Prerequisites
- Node.js v16+
- MySQL v8+

### Backend Setup

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Screenshots

### Login Page
![Login](./screenshots/login.png)

### Task Dashboard
![Dashboard](./screenshots/dashboard.png)

### Swagger API Documentation
![Swagger](./screenshots/swagger.png)

## Environment Setup

Backend `.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://root:password@localhost:3306/primetrade"
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

Update with your MySQL credentials.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login (returns JWT token)

### Tasks (Protected - requires JWT)
- `GET /api/v1/tasks` - List user tasks
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:id` - Get specific task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Admin (Admin role required)
- `GET /api/v1/admin/users` - List all users

Query parameters for tasks: `?page=1&limit=10&status=PENDING&priority=HIGH&search=meeting`

## Database Models

**User**
- id, email (unique), name, password, role (USER/ADMIN), timestamps

**Task**
- id, title, description, status (PENDING/IN_PROGRESS/COMPLETED), priority (LOW/MEDIUM/HIGH), dueDate, userId (foreign key), timestamps

## API Documentation

Swagger docs available at: `http://localhost:5000/api-docs`

## Security Features

- Password hashing with bcryptjs
- JWT token verification on protected routes
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- Ownership validation (users can only access their own tasks)

## Testing API Endpoints

Example with curl:

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Create task (use token from login)
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Learn Prisma","priority":"HIGH"}'

# Get tasks with search filter
curl -X GET "http://localhost:5000/api/v1/tasks?status=PENDING&search=meeting" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── middleware/       # Auth, validation, error handling
│   ├── routes/           # API endpoints
│   ├── validators/       # Input validation
│   ├── utils/            # Helper functions
│   ├── lib/              # Prisma client
│   ├── docs/             # Swagger specs
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json

frontend/
├── src/
│   ├── pages/            # Login, Register, Dashboard
│   ├── components/       # TaskForm, TaskList
│   ├── services/         # API client
│   ├── context/          # Auth context
│   ├── routes/           # Protected routes
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Scalability Notes

The API is designed for horizontal scaling:

- **Stateless Authentication**: JWT tokens don't require session storage, allowing multiple instances
- **Database Indexes**: Optimized queries on frequently accessed fields
- **Pagination**: Built-in to prevent loading large datasets
- **Service Layer**: Business logic separated from HTTP handlers, making code testable and reusable

Future enhancements:
- Add Redis for caching
- Implement database read replicas
- Use load balancer for multiple API instances
- Add refresh token rotation with HttpOnly cookies

## Deployment

See `DEPLOYMENT.md` for production deployment options (Docker, Vercel, AWS, etc).

## Response Format

**Success**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Paginated**
```json
{
  "success": true,
  "message": "Tasks retrieved",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Troubleshooting

**Database connection error**
- Ensure MySQL is running
- Verify DATABASE_URL in .env

**Port already in use**
- Change PORT in .env or kill existing process

**Prisma client error**
```bash
npm run prisma:generate
```

**CORS error**
- Check FRONTEND_URL in .env matches your frontend

## Developer Commands

```bash
# Backend
npm run dev              # Start with file watching
npm run prisma:studio   # Open Prisma Studio GUI
npm run prisma:push     # Sync schema to database

# Frontend
npm run dev              # Start Vite dev server
npm run build           # Build for production
```

## License

private
