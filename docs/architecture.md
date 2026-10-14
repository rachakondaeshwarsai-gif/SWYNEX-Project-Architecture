# Detailed System Architecture

## 1. Architecture Overview

The Student Task Management System uses a three-tier architecture consisting of the presentation layer, application layer, and data layer.

## 2. Component Responsibilities

### Presentation Layer
- Built with React.js, HTML, CSS, and JavaScript.
- Displays the dashboard, task list, login, and registration screens.
- Sends HTTP requests to backend REST APIs.
- Displays validation errors and task status updates.

### Application Layer
- Built with Java and Spring Boot.
- Provides REST API endpoints.
- Validates incoming requests.
- Handles authentication and authorization.
- Implements task creation, retrieval, updating, and deletion.
- Communicates with MySQL using a persistence layer.

### Data Layer
- Uses MySQL to store user and task information.
- Maintains a one-to-many relationship between users and tasks.
- Enforces primary key, foreign key, and unique email constraints.

## 3. Architecture Diagram

```text
+-----------------------------+
|       Student / User        |
+--------------+--------------+
               |
               v
+-----------------------------+
| React Frontend               |
| Login, Dashboard, Task Forms |
+--------------+--------------+
               |
          HTTP / JSON
               |
               v
+-----------------------------+
| Spring Boot REST API         |
| Controllers                  |
| Services                     |
| Validation and Security      |
| Repositories                 |
+--------------+--------------+
               |
          SQL Queries
               |
               v
+-----------------------------+
| MySQL Database               |
| Users and Tasks              |
+-----------------------------+
```

## 4. Database Relationships

- User has a one-to-many relationship with Task.
- `User.id` is the primary key of the User table.
- `Task.user_id` references `User.id`.
- Each task must belong to an authenticated user.

## 5. API Design

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Authenticate a user |
| GET | /api/tasks | List the current user's tasks |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/{id} | Retrieve a task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## 6. Error Handling

- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Missing or invalid authentication.
- `403 Forbidden`: Access to a resource is not permitted.
- `404 Not Found`: Task does not exist or is not accessible.
- `500 Internal Server Error`: Unexpected server failure.

## 7. Security Considerations

- Store passwords using a secure password-hashing algorithm.
- Use authentication for protected API endpoints.
- Validate task ownership on every task-specific request.
- Avoid exposing passwords, tokens, and secrets in API responses.
- Use HTTPS in production.
- Keep credentials in environment variables.

## 8. Proposed Development Phases

1. Finalize requirements and architecture.
2. Design the database schema and API contracts.
3. Build the Spring Boot backend.
4. Build the React frontend.
5. Integrate the frontend, backend, and database.
6. Test functionality, validation, and authorization.
7. Document deployment and future improvements.

## 9. Conclusion

The proposed architecture separates user interface concerns, business logic, and data persistence. This separation supports maintainability, security, testing, and future expansion.
