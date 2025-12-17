# TODO App

A simple Node.js Express-based TODO application with REST CRUD endpoints using an in-memory store.

## Features

- Create, Read, Update, and Delete TODO items
- RESTful API architecture
- In-memory storage (easily extendable to database)
- JSON request/response format
- Input validation and error handling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/diyaeninan/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Get All TODOs
```
GET /todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample TODO",
      "description": "This is a sample TODO",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get TODO by ID
```
GET /todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample TODO",
    "description": "This is a sample TODO",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Create New TODO
```
POST /todos
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Update TODO
```
PUT /todos/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries (updated)",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Buy groceries (updated)",
    "description": "Milk, eggs, bread",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

### 5. Delete TODO
```
DELETE /todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Buy groceries (updated)",
    "description": "Milk, eggs, bread",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

## Testing the API

You can test the API using curl, Postman, or any HTTP client.

### Example with curl:

**Create a TODO:**
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete Express tutorial"}'
```

**Get all TODOs:**
```bash
curl http://localhost:3000/todos
```

**Get a specific TODO:**
```bash
curl http://localhost:3000/todos/1
```

**Update a TODO:**
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a TODO:**
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## Data Structure

Each TODO item has the following structure:

```javascript
{
  id: Number,           // Auto-generated unique identifier
  title: String,        // Required: TODO title
  description: String,  // Optional: TODO description
  completed: Boolean,   // Optional: Completion status (default: false)
  createdAt: String,    // ISO timestamp of creation
  updatedAt: String     // ISO timestamp of last update (if updated)
}
```

## Future Enhancements

- Database integration (MongoDB, PostgreSQL, etc.)
- User authentication and authorization
- TODO categories/tags
- Due dates and reminders
- Search and filtering capabilities
- Pagination for large TODO lists

## License

ISC