<p align="center">
<a href="https://dscvit.com">
    <img src="https://user-images.githubusercontent.com/30529572/72455010-fb38d400-37e7-11ea-9c1e-8cdeb5f5906e.png" />
</a>
    <h2 align="center">Hermes</h2>
    <h4 align="center">A comprehensive real-time polling and quiz management system with live audience participation</h4>
</p>

## Overview

Hermes is a sophisticated live polling platform developed as part of the Google Developer Student Clubs (GDSC) VIT initiative. The system enables organizers to create interactive polling events with real-time audience participation, featuring live vote tracking, multi-question quizzes, and comprehensive event management capabilities.

## System Architecture

The application implements a hierarchical data structure designed for scalable event management:

- **Users** → Create and manage multiple **Events**
- **Events** → Contain multiple **Actions** (polls/quizzes)
- **Actions** → Comprise multiple **Questions**
- **Questions** → Include multiple **Options** with real-time vote statistics

## Core Technologies

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/> <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>

## Documentation Resources

[![API Documentation](https://img.shields.io/badge/API%20Documentation-Postman-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/9876592/SzKQwzQY)
[![User Interface](https://img.shields.io/badge/User%20Interface-Live%20Demo-blue?style=for-the-badge&logo=web)](https://hermes.dscvit.com)
[![API Reference](https://img.shields.io/badge/API%20Reference-Markdown-green?style=for-the-badge&logo=markdown)](./API_DOCUMENTATION.md)

## Key Features

### Authentication & Security
- **JWT-based Authentication**: Secure token-based user authentication system
- **Password Encryption**: Bcrypt implementation with configurable salt rounds
- **Route Protection**: Middleware-based access control for administrative functions
- **Input Validation**: Comprehensive request validation using Joi schema validation

### Event Management
- **Unique Event Codes**: Automatic generation of 6-digit event access codes
- **Real-time Participant Tracking**: Live participant count updates
- **Event Lifecycle Management**: Complete CRUD operations for event administration
- **User Association**: Events linked to creator accounts with ownership validation

### Interactive Polling System
- **Multi-format Actions**: Support for polls, quizzes, and interactive questionnaires
- **Question Sequencing**: Ordered question navigation with state management
- **Real-time Vote Tracking**: Redis-powered live vote counting and statistics
- **Live Broadcasting**: Socket.IO integration for instant result updates

### Real-time Communication
- **WebSocket Integration**: Bi-directional real-time communication
- **Live Vote Updates**: Instant vote count broadcasting to all participants
- **Question Navigation**: Real-time question transitions and state synchronization
- **Event State Management**: Live status updates for events, actions, and questions

## System Requirements

### Prerequisites
- **Node.js**: Version 14.0 or higher
- **MongoDB**: Version 4.0 or higher
- **Redis**: Version 5.0 or higher
- **npm**: Version 6.0 or higher

### Environment Configuration
Create a `.env` file with the following variables:

```env
DB_CONNECTION=mongodb://localhost:27017/livepoll
REDIS_URL=redis://localhost:6379
TOKEN_SECRET=your_jwt_secret_key
SALT_ROUNDS=12
PORT=3000
SSL_PORT=3443
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
REDIS_PASSWORD=redis_password
```

## Installation & Setup

### Standard Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mdhishaamakhtar/live-poll.git
   cd live-poll
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update configuration values as needed

4. **Start Services**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Docker Deployment

The application includes comprehensive Docker configuration for streamlined deployment:

1. **Using Docker Compose**
   ```bash
   # Start all services (MongoDB, Redis, Backend)
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   
   # Stop services
   docker-compose down
   ```

2. **Individual Container Build**
   ```bash
   # Build application image
   docker build -t live-poll-backend .
   
   # Run with environment configuration
   docker run -d --name live-poll --env-file .env -p 80:3000 live-poll-backend
   ```

## API Architecture

### Authentication Endpoints
- `POST /api/user/register` - User registration with validation
- `POST /api/user/login` - Authentication with JWT token generation
- `GET /api/user/getEvents` - Retrieve user's associated events

### Event Management Endpoints
- `POST /api/events/addEvent` - Create new polling event
- `GET /api/events/getEvent/:code` - Access event by unique code
- `GET /api/events/getEventdetail/:id` - Retrieve detailed event information
- `DELETE /api/events/deleteEvent/:id` - Remove event (creator only)
- `PATCH /api/events/editEventTitle/:id` - Update event title

### Action Management Endpoints
- `POST /api/actions/addAction/:eventId` - Create poll/quiz within event
- `GET /api/actions/getActiondetail/:id` - Retrieve complete action details
- `GET /api/actions/openAction/:id` - Activate action for participation
- `GET /api/actions/closeAction/:id` - Deactivate action

### Question & Option Management
- `POST /api/questions/addQuestion/:actionId` - Add individual question
- `POST /api/questions/addQuestionsAll/:actionId` - Batch question creation
- `GET /api/questions/publishQuestion/:actionId/:questionId` - Make question live
- `POST /api/options/addOption/:actionId/:questionId` - Add response option

## Real-time Communication Protocol

### WebSocket Events

**Client → Server Events:**
- `option` - Cast vote for specific option
- `next question` - Request question navigation
- `close quiz` - Terminate polling session
- `reset options` - Clear vote statistics

**Server → Client Events:**
- `all options` - Broadcast updated vote counts
- `next` - Signal question transition
- `quiz ended` - Notify session termination

### Vote Processing Flow
1. Client emits vote selection via `option` event
2. Redis increments vote counter for selected option
3. Server broadcasts updated statistics to all connected clients
4. Client interfaces update in real-time

## Development Guidelines

### Code Quality
- **Linting**: ESLint with Standard.js configuration
- **Code Formatting**: Consistent style enforcement
- **Error Handling**: Comprehensive error catching and response formatting
- **Logging**: Morgan HTTP request logging for development

### Testing Commands
```bash
# Run linter and auto-fix issues
npm run lint

# Development server with auto-reload
npm run dev

# Production server
npm start
```

## Performance Considerations

### Database Optimization
- **Mongoose ODM**: Optimized MongoDB queries with proper indexing
- **Connection Pooling**: Efficient database connection management
- **Embedded Documents**: Hierarchical data structure for reduced query complexity

### Caching Strategy
- **Redis Integration**: Real-time vote counting with memory-based storage
- **Session Management**: Efficient state management for active sessions
- **Data Persistence**: Automatic cleanup and restoration mechanisms

### Scalability Features
- **Docker Support**: Containerized deployment for horizontal scaling
- **Environment Configuration**: Flexible configuration for different deployment scenarios
- **SSL/TLS Support**: Production-ready HTTPS configuration

## Security Implementation

### Authentication Security
- **JWT Token Validation**: Stateless authentication with secure token verification
- **Password Hashing**: Bcrypt encryption with configurable complexity
- **Route Protection**: Middleware-based authorization for sensitive endpoints

### Data Validation
- **Input Sanitization**: Joi-based request validation
- **SQL Injection Prevention**: NoSQL injection protection through Mongoose
- **CORS Configuration**: Controlled cross-origin resource sharing

## Deployment Architecture

### Production Environment
The system supports both traditional and containerized deployment:

**Traditional Deployment:**
- Node.js process management with PM2
- Reverse proxy configuration (Nginx recommended)
- SSL/TLS certificate integration
- Environment-based configuration management

**Container Deployment:**
- Multi-service Docker Compose configuration
- Persistent volume mapping for data retention
- Network isolation and service discovery
- Health check implementation

### Monitoring & Maintenance
- **Application Logging**: Comprehensive request and error logging
- **Performance Metrics**: Response time and throughput monitoring
- **Error Tracking**: Centralized error collection and analysis
- **Database Monitoring**: Connection pool and query performance tracking

## Contributing

This project welcomes contributions from the developer community. Please refer to the contribution guidelines and ensure all pull requests include appropriate documentation and testing.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for complete terms and conditions.

## Developer

**Md Hishaam Akhtar**  
GitHub: [@mdhishaamakhtar](https://github.com/mdhishaamakhtar)  
LinkedIn: [@mdhishaamakhtar](https://www.linkedin.com/in/mdhishaamakhtar)

---

<p align="center">
    Developed with ❤️ by <a href="https://dscvit.com">GDSC VIT</a>
</p>
