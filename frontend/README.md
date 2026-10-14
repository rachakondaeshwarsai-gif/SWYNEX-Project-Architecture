# Frontend Documentation

## 1. Overview
The frontend provides an interface for students to manage academic tasks, deadlines, and progress.

## 2. Technology Stack
- React.js
- HTML5
- CSS3
- JavaScript
- Fetch API for backend communication

## 3. Planned Screens
- **Registration:** Create a student account.
- **Login:** Authenticate registered students.
- **Dashboard:** Display total, pending, and completed tasks.
- **Task List:** View and filter tasks by status and priority.
- **Task Form:** Add or edit task details.
- **Task Details:** View the description, priority, deadline, and status.

## 4. Proposed Folder Structure
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

## 5. API Integration
The frontend will communicate with the Spring Boot backend through REST APIs using HTTP requests and JSON responses.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

## 6. Validation and User Experience
- Validate required fields.
- Display useful error messages.
- Show loading states while requests are processing.
- Confirm successful task operations.
- Support desktop and mobile layouts.

## 7. Future Improvements
- Calendar-based task views.
- Deadline notifications.
- Dashboard charts.
- Search and sorting.

## 8. Current Status
This document describes the planned frontend design. React components and API integration will be implemented during development.
