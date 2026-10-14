# Backend Documentation

## 1. Overview

The backend of the Student Task Management System will manage business logic, user authentication, task operations, and communication with the MySQL database.

## 2. Technology Stack

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL
- Maven

## 3. Proposed Backend Structure

```text
backend/
├── README.md
└── src/
    └── main/
        ├── java/
        │   └── com/studenttask/
        │       ├── controller/
        │       ├── service/
        │       ├── repository/
        │       ├── model/
        │       ├── dto/
        │       └── config/
        └── resources/
            └── application.properties
```

This is the proposed structure. The backend implementation will be added during development.

## 4. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Authenticate a user |
| GET | /api/tasks | Get the current user's tasks |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/{id} | Get a specific task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## 5. Database Design

### User Entity
- `id`: Primary key
- `name`: Student name
- `email`: Unique email address
- `password_hash`: Securely hashed password

### Task Entity
- `id`: Primary key
- `title`: Task title
- `description`: Task details
- `due_date`: Task deadline
- `priority`: LOW, MEDIUM, or HIGH
- `status`: PENDING, IN_PROGRESS, or COMPLETED
- `user_id`: Foreign key referencing the user

## 6. Backend Responsibilities

- Validate incoming requests.
- Authenticate users and authorize protected requests.
- Implement task CRUD operations.
- Persist data through Spring Data JPA.
- Return appropriate HTTP status codes.
- Handle errors consistently.

## 7. Security

- Hash passwords using a secure password encoder.
- Protect private endpoints with authentication.
- Verify task ownership for every task-specific operation.
- Keep database credentials outside version control.
- Use HTTPS in production.

## 8. Testing Strategy

- Unit-test service-layer business logic.
- Test API endpoints and validation.
- Test database relationships and persistence.
- Test authentication and authorization.
- Verify error handling for invalid requests.

## 9. Current Status

This document describes the proposed backend architecture. Controllers, services, repositories, and database integration are planned for implementation.

## 10. Future Enhancements

- Pagination and sorting.
- Deadline notifications.
- API documentation using OpenAPI.
- Docker-based deployment.
- Automated testing in a CI/CD pipeline.
