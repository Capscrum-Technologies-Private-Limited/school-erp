# School ERP System

A comprehensive School Management System with a separated architecture for better scalability and maintenance.

## Project Structure

- **`/backend`**: Spring Boot application (Java 17).
- **`/frontend`**: React + TypeScript + Vite application.
- **`/docs`**: Project documentation and design files.

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven (or use included `mvnw`)

### Running the Application

The backend is currently hosted online at `https://school-erp-production-1ad0.up.railway.app`. You only need to run the frontend locally.

From the root directory:

#### Frontend Setup
```bash
# Install dependencies
npm run frontend:install

# Run development server
npm run frontend:dev
```

#### Frontend Build
```bash
# Create production build
npm run frontend:build
```

## Environment Configuration

The frontend uses the `.env` file located in `frontend/` for API URL configuration.
The backend uses standard Spring Boot properties/environment variables.

---
Created by Antigravity AI
