# Frontend Documentation

## 1. Overview

The frontend of the Student Task Management System provides a web-based interface for students to manage their academic tasks, track progress, and organize their workload.

## 2. Technology Stack

- React.js
- Vite
- HTML5
- CSS3
- JavaScript
- Axios for backend communication
- Lucide React for icons

## 3. Implemented Features

- Dashboard with task statistics
- Display all tasks
- Create new tasks
- Update task status
- Delete tasks
- Search tasks by title
- Priority-based task labels
- Responsive dashboard layout

## 4. Frontend Structure

```text
frontend/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## 5. API Integration

The frontend communicates with the Node.js and Express backend using Axios and JSON responses.

Backend base URL:

`http://localhost:3000/api/tasks`

Supported API operations:

- GET `/api/tasks` – Retrieve all tasks
- POST `/api/tasks` – Create a task
- PUT `/api/tasks/{id}` – Update a task
- DELETE `/api/tasks/{id}` – Delete a task

## 6. Database Integration

The frontend retrieves and modifies task data through the backend REST API. The backend uses MySQL for persistent storage.

## 7. Validation and User Experience

- Validate required task titles.
- Display loading states while retrieving tasks.
- Display error messages when API requests fail.
- Confirm before deleting tasks.
- Provide search functionality.

## 8. Future Improvements

- Student registration and login
- Task descriptions and deadline management
- Calendar-based task views
- Notifications for upcoming deadlines
- Advanced filtering and sorting

## 9. Current Status

The React frontend has been implemented and successfully integrated with the backend REST API and MySQL database. Create, Read, Update, and Delete operations have been tested successfully.

**Project:** SWYNEX Technologies Internship – Task 3