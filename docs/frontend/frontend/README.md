# Frontend Documentation

## 1. Overview

The frontend of the Student Task Management System provides an interface for students to manage their academic tasks, deadlines, and progress.

## 2. Technology Stack

- React.js
- HTML5
- CSS3
- JavaScript
- Fetch API for backend communication

## 3. Planned Screens

### Registration
Allows a new student to create an account using their name, email, and password.

### Login
Allows registered students to authenticate.

### Dashboard
Displays total tasks, pending tasks, completed tasks, and upcoming deadlines.

### Task List
Displays tasks with options to filter by status and priority.

### Add or Edit Task
Provides a form for entering or updating task details.

### Task Details
Displays the selected task's description, priority, deadline, and status.

## 4. Frontend Structure

```text
frontend/
├── README.md
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── styles/
    └── App.jsx
```

This is the proposed structure. The application components will be implemented during development.

## 5. API Integration

The frontend will communicate with the Spring Boot backend using HTTP requests and JSON responses.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

Protected requests will include the configured authentication credentials or token.

## 6. Validation and User Experience

- Validate required fields before submitting forms.
- Display clear error messages.
- Show loading states while requests are processing.
- Confirm successful task operations.
- Provide responsive layouts for desktop and mobile screens.

## 7. Future Improvements

- Calendar-based task views.
- Notifications for upcoming deadlines.
- Dashboard charts.
- Search and sorting.

## 8. Current Status

This document describes the planned frontend design. The React components and API integration are to be implemented.
