# BugTracer - Professional Bug Tracking System

A modern, full-stack bug tracking application built with Angular and Node.js. Perfect for software development teams to efficiently manage bugs and track project progress.

## Features

### Professional UI/UX
- **Modern Angular Material Design** with beautiful animations
- **Responsive Design** that works on all devices
- **Professional Landing Page** with stunning animations
- **Real-time Updates** and smooth transitions
- **Colorful Interface** with gradient backgrounds

### User Management
- **Secure Authentication** with JWT tokens
- **Role-Based Access Control** (Admin, Developer, Tester)
- **Professional Registration & Login** forms
- **Email Validation** with proper regex patterns
- **Password Requirements** with helpful feedback

### Bug Management
- **Create Bugs** with detailed information
- **Edit Bugs** with professional interface
- **Delete Bugs** with confirmation
- **Close Bugs** with one-click action
- **Priority Levels** (Low, Medium, High, Critical)
- **Status Tracking** (Open, In Progress, Fixed, Closed)
- **Real-time Dashboard** with statistics

### Dashboard Features
- **Role-Specific Dashboards** for different user types
- **Bug Statistics** with visual charts
- **Recent Activity** overview
- **Action Buttons** with amazing animations
- **Real-time Updates** after actions

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Express-validator** for input validation
- **CORS** for frontend-backend communication

### Frontend
- **Angular 17+** with standalone components
- **Angular Material** for professional UI
- **TypeScript** for type safety
- **RxJS** for reactive programming
- **Angular Router** for navigation
- **Angular Forms** for form handling

## Project Structure

```
BugTracer/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── bugController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Bug.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── bugs.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── landing/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── create-bug/
│   │   │   │   └── edit-bug/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── app.routes.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.ts
│   │   ├── main.ts
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **Angular CLI** (v17 or higher)
- **MongoDB** (installed and running)
- **Git** for version control

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bugtracer
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the Angular development server:
```bash
ng serve
```

The application will be available at **http://localhost:4200**

## Access Your Application

1. **Open your browser** and navigate to: **http://localhost:4200**
2. **Register** a new account (Admin role recommended)
3. **Login** with your credentials
4. **Start tracking bugs** with the professional interface!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Bugs
- `GET /api/bugs` - Get all bugs
- `GET /api/bugs/:id` - Get specific bug
- `POST /api/bugs` - Create bug (Admin/Tester/Developer)
- `PUT /api/bugs/:id` - Update bug (Admin/Developer)
- `DELETE /api/bugs/:id` - Delete bug (Admin only)

## User Roles and Permissions

### Admin
- Create and manage users
- Create and delete bugs
- Assign bugs to developers
- Full access to all features
- View system statistics

### Developer
- View assigned bugs
- Update bug status
- Edit bug details
- Add comments and updates
- Close resolved bugs

### Tester
- Create and report bugs
- View bug status
- Update bug descriptions
- Close resolved bugs
- Track bug progress

## Database Schema

### User Model
```javascript
{
  username: String (3-20 chars, alphanumeric + underscore),
  email: String (valid email format),
  password: String (min 6 chars, uppercase + lowercase + number),
  role: String (admin/developer/tester),
  createdAt: Date
}
```

### Bug Model
```javascript
{
  title: String (required),
  description: String (required),
  priority: String (low/medium/high/critical),
  status: String (open/in_progress/fixed/closed),
  reporter: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  project: ObjectId (ref: Project),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Guide

### First Time Setup
1. **Start MongoDB** service
2. **Start Backend** server (`npm run dev` in backend directory)
3. **Start Frontend** (`ng serve` in frontend directory)
4. **Register** as Admin user first
5. **Create projects** and add team members
6. **Start tracking bugs!**

### Daily Workflow
1. **Login** to your account
2. **Dashboard** shows current bug statistics
3. **Create Bug** for new issues found
4. **Assign** bugs to team members
5. **Track Progress** through bug lifecycle
6. **Close** bugs when resolved

## GitHub Upload Instructions

### Step 1: Initialize Git Repository
```bash
cd "C:\Users\DELLL\CascadeProjects\BugTracer"
git init
```

### Step 2: Create .gitignore
```bash
echo "node_modules/
.env
dist/
build/
*.log
.DS_Store
Thumbs.db" > .gitignore
```

### Step 3: Add All Files to Git
```bash
git add .
git commit -m "Initial commit: BugTracer Professional Bug Tracking System"
```

### Step 4: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Name it **"BugTracer"**
4. Add description: **"Professional Bug Tracking System with Angular and Node.js"**
5. Click **"Create repository"**
6. Copy the repository URL

### Step 5: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/BugTracer.git
git branch -M main
git push -u origin main
```

### Step 6: Update Repository
```bash
git add .
git commit -m "Update: Enhanced UI with animations and professional design"
git push origin main
```

## Features Showcase

### Professional Animations
- **Floating particles** in background
- **Shimmer effects** on buttons
- **Scale and rotate** animations on hover
- **Smooth transitions** throughout
- **Orbital animations** on main icon

### Colorful Design
- **Gradient backgrounds** with multiple colors
- **Professional color scheme** throughout
- **Glassmorphism effects** with backdrop blur
- **Vibrant button gradients** with hover effects
- **Animated color transitions**

### Professional UI Elements
- **Material Design** components
- **Responsive layout** for all devices
- **Professional typography** and spacing
- **Consistent design language**
- **Accessibility features** built-in

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes with professional code
4. **Test** thoroughly on both frontend and backend
5. **Submit** a pull request with detailed description
6. **Wait** for review and merge!

## License

This project is licensed under the **MIT License** - feel free to use it for your projects!

## Future Enhancements

- [ ] **Email Notifications** for bug updates
- [ ] **File Attachments** for bug reports
- [ ] **Advanced Search** and filtering capabilities
- [ ] **Bug Analytics** and reporting
- [ ] **Integration** with Git/GitHub
- [ ] **Real-time Updates** using WebSockets
- [ ] **Mobile Application** (React Native)
- [ ] **API Documentation** with Swagger
- [ ] **Unit Tests** and E2E Tests
- [ ] **CI/CD Pipeline** setup

