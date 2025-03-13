# django-react-project-managment-system

A project for learning django and react

# Application: Project Management System

# Application Description:

This is a web application that allows users to manage projects, tasks, and collaborate with team members.
Users can register, log in, create projects, add tasks, assign tasks to members, track progress, and receive notifications when updates occur.

The application will have a frontend interface (ReactJS + RTK) and a backend API (Django REST Framework).

## Key Features:

#### User Management:

Register, log in, log out (Django Authentication + JWT).
Role-based access control: Admin, Project Manager, Member.

#### Project Management:

Create, edit, and delete projects.
Add members to projects.

#### Task Management:

Create tasks within projects, assign them to members, and set deadlines.
Track task statuses (To Do, In Progress, Done).

#### Notifications:

Send notifications when a task is assigned or completed (using WebSocket or API polling).

#### Dashboard:

Display a list of projects, personal tasks, and an overall progress overview.

## Technologies to Learn and Apply:

### 1. Backend (Django + Django REST Framework):

- Django Models: Create data models like User, Project, Task, Notification.
- Django REST Framework (DRF): Build APIs for frontend consumption (e.g., /api/projects/, /api/tasks/).
- Authentication: Use JWT (JSON Web Token) for user authentication.
- Database: Start with SQLite, then upgrade to PostgreSQL if needed.
- WebSocket (Optional): Use Django Channels for real-time notifications.

### 2. Frontend (ReactJS + Redux Toolkit):

- ReactJS: Build UI components such as ProjectList, TaskCard, and Dashboard.
- Redux Toolkit (RTK): Manage application state (projects, tasks, notifications).
- Use createSlice to manage state, such as project or task lists.
- Use createAsyncThunk to fetch data from the backend (e.g., retrieve task lists).
- React Router: Handle navigation between pages (Dashboard, Project Detail, Profile).
- CSS: Use Material-UI for a modern and responsive UI.
