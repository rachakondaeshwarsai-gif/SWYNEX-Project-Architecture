# SWYNEX Backend API and Database

A Node.js + Express.js REST API with MySQL persistence for the Student Task Management System planned in Task 1.

## Features

- Create, list, retrieve, update, and delete tasks (CRUD)
- Request validation for title, due date, status, and priority
- Parameterized SQL queries to avoid SQL injection
- Consistent JSON responses and HTTP status codes
- MySQL connection pool and environment-based configuration
- Health-check endpoint

## Requirements

- Node.js 18 or newer
- MySQL 8 or compatible version
- npm

## Setup

1. Clone your repository and enter the project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the database and table by running `database/schema.sql` in MySQL Workbench or the MySQL command line:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. Copy `.env.example` to `.env` and update `DB_USER`, `DB_PASSWORD`, and other values to match your local MySQL configuration. Never commit `.env`.
5. Start the API:

   ```bash
   npm start
   ```

6. Visit `http://localhost:3000/health`. A healthy response should look like:

   ```json
   { "success": true, "status": "healthy" }
   ```

## Data model

`tasks` includes `id`, `title`, `description`, `due_date`, `status`, `priority`, `created_at`, and `updated_at`. `status` is one of `pending`, `in_progress`, or `completed`; `priority` is one of `low`, `medium`, or `high`.

## API endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | API health check |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create a task

`POST /api/tasks` with `Content-Type: application/json`:

```json
{
  "title": "Complete DBMS assignment",
  "description": "Finish normalization exercises",
  "due_date": "2026-11-02",
  "status": "pending",
  "priority": "high"
}
```

`title` is required (1–120 characters after trimming). `description` and `due_date` can be omitted or null. Status defaults to `pending`, and priority defaults to `medium`. Dates must be valid `YYYY-MM-DD` calendar dates.

### Example validation error

A request with an empty title returns HTTP `400`:

```json
{
  "success": false,
  "errors": ["title is required and must be a non-empty string."]
}
```

## Test with curl

```bash
curl http://localhost:3000/api/tasks

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete assignment","priority":"high"}'

curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

curl -X DELETE http://localhost:3000/api/tasks/1
```

You can also send the same requests from Postman. Test valid input, an empty title, an invalid status, an invalid date, a missing task ID, and an unknown route.

## Project structure

```text
SWYNEX-Backend-API-and-Database/
├── database/schema.sql
├── src/
│   ├── config/db.js
│   ├── controllers/tasksController.js
│   ├── middleware/errorHandler.js
│   ├── middleware/notFound.js
│   ├── routes/tasks.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Security and limitations

- SQL queries use placeholders for user-supplied values.
- Secrets belong in `.env`, which is ignored by Git.
- This task implementation does not include authentication or user ownership; add those before using it with real student data.

## Internship task

Prepared for SWYNEX Internship Task 2: Backend API and Database. Verify the API locally and update this README with screenshots or test results from your own run before submitting.
