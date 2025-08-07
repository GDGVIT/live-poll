# Live Poll Backend API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Event Management](#event-management)
  - [Action Management](#action-management)
  - [Question Management](#question-management)
  - [Option Management](#option-management)
- [WebSocket Events](#websocket-events)
- [Data Models](#data-models)
- [Examples](#examples)

## Overview

The Live Poll Backend API provides a comprehensive RESTful interface for managing real-time polling and quiz systems. The API supports user authentication, event creation, poll/quiz management, and real-time interaction capabilities through WebSocket connections.

**API Version:** 1.0.0  
**Protocol:** HTTP/HTTPS  
**Data Format:** JSON  
**Authentication:** JWT (JSON Web Tokens)

## Authentication

The API uses JWT (JSON Web Token) based authentication. After successful login, include the JWT token in the request header for protected endpoints.

**Header Format:**
```http
auth-token: YOUR_JWT_TOKEN_HERE
```

**Token Expiration:** Tokens do not expire unless manually revoked.

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## Response Format

All API responses follow a consistent JSON format:

**Success Response:**
```json
{
  "data": {},
  "message": "Success message",
  "status": "success"
}
```

**Error Response:**
```json
{
  "message": "Error description",
  "error": "Error details",
  "status": "error"
}
```

## Error Handling

The API uses standard HTTP status codes:

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Invalid or missing token |
| 404  | Not Found - Resource doesn't exist |
| 500  | Internal Server Error |

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production environments.

---

## API Endpoints

### User Authentication

#### Register User
Create a new user account.

**Endpoint:** `POST /api/user/register`  
**Authentication:** Not required

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email, min 6 chars)",
  "password": "string (required, min 8 chars)"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "events": []
}
```

**Validation Rules:**
- Email must be valid format and minimum 6 characters
- Password must be minimum 8 characters
- Name is required

---

#### Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/user/login`  
**Authentication:** Not required

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)"
}
```

**Response:**
```json
{
  "Auth Token": "jwt_token_string"
}
```

**Response Headers:**
```http
auth-token: jwt_token_string
```

---

#### Get User Events
Retrieve all events associated with authenticated user.

**Endpoint:** `GET /api/user/getEvents`  
**Authentication:** Required

**Response:**
```json
[
  {
    "_id": "event_id",
    "Name": "Event Name",
    "Code": "123456"
  }
]
```

---

### Event Management

#### Create Event
Create a new polling event.

**Endpoint:** `POST /api/events/addEvent`  
**Authentication:** Required

**Request Body:**
```json
{
  "Name": "string (required)"
}
```

**Response:**
```json
{
  "_id": "event_id",
  "Name": "Event Name",
  "Code": "123456",
  "Actions": [],
  "Participants": 0,
  "Date": "2023-12-01T00:00:00.000Z"
}
```

**Notes:**
- Event code is automatically generated (6-digit number)
- Event is automatically associated with authenticated user

---

#### Get Event by Code
Retrieve event information using event code (public access).

**Endpoint:** `GET /api/events/getEvent/:code`  
**Authentication:** Not required

**Parameters:**
- `code` (path): 6-digit event code

**Response:**
```json
{
  "_id": "event_id",
  "Name": "Event Name",
  "Code": "123456",
  "Actions": [...],
  "Participants": 15
}
```

---

#### Get Event Details
Retrieve comprehensive event information including all actions and questions.

**Endpoint:** `GET /api/events/getEventdetail/:eventId`  
**Authentication:** Not required

**Parameters:**
- `eventId` (path): Event ID

**Response:**
```json
{
  "_id": "event_id",
  "Name": "Event Name",
  "Code": "123456",
  "Actions": [
    {
      "_id": "action_id",
      "title": "Action Title",
      "action_type": "poll",
      "Questions": [...],
      "isOpen": true
    }
  ],
  "Participants": 15
}
```

---

#### Update Participants
Increment participant count for an event.

**Endpoint:** `GET /api/events/updateParticipant/:code`  
**Authentication:** Not required

**Parameters:**
- `code` (path): 6-digit event code

**Response:**
```json
{
  "Participants": 16
}
```

---

#### Delete Event
Remove an event (creator only).

**Endpoint:** `DELETE /api/events/deleteEvent/:eventId`  
**Authentication:** Required

**Parameters:**
- `eventId` (path): Event ID

**Response:**
```json
{
  "message": "Event deleted successfully"
}
```

---

#### Edit Event Title
Update event title.

**Endpoint:** `PATCH /api/events/editEventTitle/:eventId`  
**Authentication:** Required

**Parameters:**
- `eventId` (path): Event ID

**Request Body:**
```json
{
  "Name": "New Event Title"
}
```

**Response:**
```json
{
  "_id": "event_id",
  "Name": "New Event Title",
  "Code": "123456"
}
```

---

### Action Management

Actions represent polls, quizzes, or interactive sessions within an event.

#### Create Action
Add a new action (poll/quiz) to an event.

**Endpoint:** `POST /api/actions/addAction/:eventId`  
**Authentication:** Required

**Parameters:**
- `eventId` (path): Event ID

**Request Body:**
```json
{
  "action_type": "string (required)",
  "title": "string (required)"
}
```

**Response:**
```json
{
  "_id": "action_id",
  "title": "Action Title",
  "action_type": "poll",
  "isOpen": false,
  "Questions": [],
  "timestamp": "2023-12-01T00:00:00.000Z"
}
```

---

#### Get Action Details
Retrieve complete action information including all questions and options.

**Endpoint:** `GET /api/actions/getActiondetail/:actionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "_id": "action_id",
  "title": "Action Title",
  "action_type": "poll",
  "isOpen": true,
  "Questions": [
    {
      "_id": "question_id",
      "name": "Question Text",
      "options": [
        {
          "_id": "option_id",
          "option": "Option Text",
          "stat": 5
        }
      ],
      "isOpen": true
    }
  ]
}
```

---

#### Get Basic Action Info
Retrieve basic action information (title, type, status).

**Endpoint:** `GET /api/actions/getBasicAction/:actionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "_id": "action_id",
  "title": "Action Title",
  "action_type": "poll",
  "isOpen": true
}
```

---

#### Open Action
Set action status to open/active.

**Endpoint:** `GET /api/actions/openAction/:actionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "message": "Action opened successfully",
  "isOpen": true
}
```

---

#### Close Action
Set action status to closed/inactive.

**Endpoint:** `GET /api/actions/closeAction/:actionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "message": "Action closed successfully",
  "isOpen": false
}
```

---

#### Delete Action
Remove an action from an event.

**Endpoint:** `DELETE /api/actions/deleteAction/:eventId/:actionId`  
**Authentication:** Required

**Parameters:**
- `eventId` (path): Event ID
- `actionId` (path): Action ID

**Response:**
```json
{
  "message": "Action deleted successfully"
}
```

---

### Question Management

#### Add Single Question
Add a question to an action.

**Endpoint:** `POST /api/questions/addQuestion/:actionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response:**
```json
{
  "_id": "question_id",
  "name": "Question Text",
  "options": [],
  "isOpen": false
}
```

---

#### Add Multiple Questions
Add multiple questions to an action at once.

**Endpoint:** `POST /api/questions/addQuestionsAll/:actionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID

**Request Body:**
```json
{
  "questions": [
    {
      "name": "Question 1 Text"
    },
    {
      "name": "Question 2 Text"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Questions added successfully",
  "count": 2
}
```

---

#### Publish Question
Make a specific question live/active.

**Endpoint:** `GET /api/questions/publishQuestion/:actionId/:questionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Question ID

**Response:**
```json
{
  "message": "Question published successfully",
  "questionId": "question_id"
}
```

---

#### Publish First Question
Make the first question in an action live/active.

**Endpoint:** `GET /api/questions/publishQuestion/:actionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "message": "First question published successfully",
  "questionId": "question_id"
}
```

---

#### Close Question
Close/deactivate a specific question.

**Endpoint:** `GET /api/questions/closeQuestion/:actionId/:questionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Question ID

**Response:**
```json
{
  "message": "Question closed successfully",
  "questionId": "question_id"
}
```

---

#### Get Next Question
Retrieve the next question in sequence.

**Endpoint:** `GET /api/questions/nextQuestion/:actionId/:questionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Current Question ID

**Response:**
```json
{
  "_id": "next_question_id",
  "name": "Next Question Text",
  "options": [...],
  "isOpen": false
}
```

---

#### Get First Question
Retrieve the first question in an action.

**Endpoint:** `GET /api/questions/nextQuestion/:actionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID

**Response:**
```json
{
  "_id": "first_question_id",
  "name": "First Question Text",
  "options": [...],
  "isOpen": false
}
```

---

#### Navigate to Next Question
Move to the next question and emit WebSocket event.

**Endpoint:** `GET /api/questions/next/:actionId/:questionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Current Question ID

**Response:**
```json
{
  "message": "Moved to next question",
  "nextQuestion": {
    "_id": "next_question_id",
    "name": "Next Question Text"
  }
}
```

---

### Option Management

#### Add Option
Add a response option to a question.

**Endpoint:** `POST /api/options/addOption/:actionId/:questionId`  
**Authentication:** Not required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Question ID

**Request Body:**
```json
{
  "option": "string (required)"
}
```

**Response:**
```json
{
  "_id": "option_id",
  "option": "Option Text",
  "stat": 0
}
```

---

#### Update Option Statistics
Update vote count for an option (used internally).

**Endpoint:** `POST /api/options/updateStat/:actionId/:questionId/:optionId`  
**Authentication:** Required

**Parameters:**
- `actionId` (path): Action ID
- `questionId` (path): Question ID
- `optionId` (path): Option ID

**Response:**
```json
{
  "_id": "option_id",
  "stat": 1
}
```

---

## WebSocket Events

The API supports real-time communication through Socket.IO WebSocket connections.

**Connection URL:** `ws://your-domain.com` or `wss://your-domain.com`

### Client → Server Events

#### Cast Vote
```javascript
socket.emit('option', 'option_id');
```

#### Request Next Question
```javascript
socket.emit('next question', {
  actionId: 'action_id',
  currentQuestionId: 'question_id'
});
```

#### Close Quiz
```javascript
socket.emit('close quiz', ['option_id_1', 'option_id_2']);
```

#### Reset Options
```javascript
socket.emit('reset options', ['option_id_1', 'option_id_2']);
```

### Server → Client Events

#### Vote Count Update
```javascript
socket.on('all options', (data) => {
  // data: { _id: 'option_id', stat: 5 }
});
```

#### Question Navigation
```javascript
socket.on('next', (data) => {
  // data: question navigation information
});
```

#### Quiz Ended
```javascript
socket.on('quiz ended', (actionId) => {
  // actionId: ID of the closed action
});
```

---

## Data Models

### User Model
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "events": ["ObjectId"]
}
```

### Event Model
```json
{
  "_id": "ObjectId",
  "Name": "string",
  "Code": "string (6 digits, unique)",
  "Actions": ["ObjectId"],
  "Participants": "number",
  "Date": "Date"
}
```

### Action Model
```json
{
  "_id": "ObjectId",
  "timestamp": "Date",
  "action_type": "string",
  "title": "string",
  "isOpen": "boolean",
  "Questions": [QuestionSchema]
}
```

### Question Schema
```json
{
  "_id": "ObjectId",
  "name": "string",
  "options": [OptionSchema],
  "correct": "string (optional)",
  "isOpen": "boolean"
}
```

### Option Schema
```json
{
  "_id": "ObjectId",
  "option": "string",
  "stat": "number (default: 0)"
}
```

---

## Examples

### Complete Polling Session Flow

#### 1. Register and Login
```javascript
// Register
const registerResponse = await fetch('/api/user/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword'
  })
});

// Login
const loginResponse = await fetch('/api/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword'
  })
});

const { "Auth Token": token } = await loginResponse.json();
```

#### 2. Create Event and Action
```javascript
// Create Event
const eventResponse = await fetch('/api/events/addEvent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': token
  },
  body: JSON.stringify({
    Name: 'My Polling Event'
  })
});

const event = await eventResponse.json();

// Create Action
const actionResponse = await fetch(`/api/actions/addAction/${event._id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': token
  },
  body: JSON.stringify({
    action_type: 'poll',
    title: 'Customer Satisfaction Survey'
  })
});

const action = await actionResponse.json();
```

#### 3. Add Questions and Options
```javascript
// Add Question
const questionResponse = await fetch(`/api/questions/addQuestion/${action._id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': token
  },
  body: JSON.stringify({
    name: 'How satisfied are you with our service?'
  })
});

const question = await questionResponse.json();

// Add Options
await fetch(`/api/options/addOption/${action._id}/${question._id}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ option: 'Very Satisfied' })
});

await fetch(`/api/options/addOption/${action._id}/${question._id}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ option: 'Satisfied' })
});

await fetch(`/api/options/addOption/${action._id}/${question._id}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ option: 'Dissatisfied' })
});
```

#### 4. Start Real-time Session
```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000');

// Open Action
await fetch(`/api/actions/openAction/${action._id}`);

// Publish Question
await fetch(`/api/questions/publishQuestion/${action._id}/${question._id}`, {
  headers: { 'auth-token': token }
});

// Listen for votes
socket.on('all options', (data) => {
  console.log(`Option ${data._id} now has ${data.stat} votes`);
});
```

#### 5. Participant Voting
```javascript
// Participant connects and votes
const participantSocket = io('http://localhost:3000');

// Cast vote
participantSocket.emit('option', 'option_id_here');
```

### Error Handling Example
```javascript
try {
  const response = await fetch('/api/events/addEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      Name: 'My Event'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const event = await response.json();
  console.log('Event created:', event);

} catch (error) {
  console.error('Failed to create event:', error.message);
}
```

---

## Notes and Best Practices

1. **Authentication:** Always include the JWT token in the `auth-token` header for protected endpoints.

2. **Error Handling:** Check HTTP status codes and handle errors appropriately in your client application.

3. **WebSocket Connection:** Establish WebSocket connection for real-time features. Handle connection events and reconnection logic.

4. **Rate Limiting:** Consider implementing client-side rate limiting to avoid overwhelming the server.

5. **Data Validation:** Validate data on the client side before sending requests to improve user experience.

6. **CORS:** Ensure proper CORS configuration for cross-origin requests in production environments.

7. **HTTPS:** Use HTTPS in production for secure data transmission.

8. **Token Management:** Implement proper token storage and refresh mechanisms in production applications.

---

*This documentation is maintained for Live Poll Backend API v1.0.0. For updates and changes, please refer to the project repository.*