# SWYNEX Project Architecture

## 1. Project Overview

The Student Task Management System is a full-stack web application designed to help students organize academic tasks, assignments, deadlines, and progress in one place.

## 2. Objectives

- Create, update, view, and delete tasks.
- Track task deadlines and completion status.
- Organize tasks by priority and category.
- Provide a dashboard showing task progress.

## 3. Technology Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **API Style:** REST API
- **Version Control:** Git and GitHub

## 4. System Architecture

The application follows a three-tier architecture.

1. **Presentation Layer:** React provides the user interface.
2. **Application Layer:** Spring Boot processes requests, validates input, and applies business logic.
3. **Data Layer:** MySQL stores users and tasks.

### Request Flow

User → React Frontend → Spring Boot REST API → MySQL Database

The response returns through the backend to the frontend.

## 5. Data Models

### User

| Field | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(100) | Student name |
| email | VARCHAR(150) | Unique email |
| password_hash | VARCHAR(255) | Hashed password |

### Task

| Field | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| title | VARCHAR(150) | Task title |
| description | TEXT | Task details |
| due_date | DATE | Deadline |
| priority | VARCHAR(20) | LOW, MEDIUM, HIGH |
| status | VARCHAR(20) | PENDING, IN_PROGRESS, COMPLETED |
| user_id | BIGINT | Foreign key referencing User |

### Relationship

One user can create multiple tasks. Each task belongs to one user.

## 6. REST API Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Authenticate a user |
| GET | /api/tasks | Retrieve the user's tasks |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/{id} | Retrieve one task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

All task operations must enforce authentication and verify that the current user owns the requested task.

## 7. Frontend Screens

1. **Registration Screen:** Create a student account.
2. **Login Screen:** Authenticate an existing user.
3. **Dashboard:** Display total, pending, and completed tasks.
4. **Task List:** View and filter tasks by status and priority.
5. **Task Form:** Add or edit task details.
6. **Task Details:** View the full description and deadline.

## 8. Initial Repository Structure

```text
SWYNEX-Project-Architecture/
├── README.md
├── docs/
│   └── architecture.md
├── frontend/
│   └── README.md
└── backend/
    └── README.md
```

The frontend and backend directories will contain the application code as development progresses. The docs directory will contain detailed design documentation.

## 9. Security and Validation

- Hash passwords before storing them.
- Validate user input on both frontend and backend.
- Authenticate protected API requests.
- Enforce task ownership for read, update, and delete operations.
- Store secrets in environment variables rather than committing them to GitHub.

## 10. Future Enhancements

- Email reminders for upcoming deadlines.
- Calendar integration.
- Search and filtering.
- Task progress charts.
- Docker-based deployment.

## 11. Conclusion

This architecture establishes a modular foundation for a student task management application. Separating the frontend, backend, and database makes the system easier to maintain, test, and extend.
