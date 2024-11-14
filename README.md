# Sports Facility Booking Platform

## 🌐 Live Demo
https://sports-facility-server-v2.vercel.app

## 📝 Project Description
The Sports Facility Booking Platform is a robust backend application designed to streamline the process of reserving sports facilities. It offers an intuitive API for users to browse, book, and manage sports venues, while providing administrators with powerful oversight tools.

## ✨ Key Features
- 👤 User authentication and authorization
- 🏟️ Comprehensive facility management
- 📅 Smart booking system with availability checking
- 💰 Automatic payment calculation
- 🔒 Role-based access control
- 🗑️ Soft delete functionality for facilities
- ⚠️ Advanced error handling and validation

## 🛠️ Technology Stack
- **Backend**: TypeScript, Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Development**: Nodemon, ts-node

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/reZerOR/sports-facility-booking-server-
   ```

2. Navigate to the project directory:
   ```
   cd sports-facility-booking-server-
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:
   ```
   cp .env.example .env

   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```
   npm run start:dev
   ```

## 🔗 API Endpoints

### User Routes
- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login

### Facility Routes
- `POST /api/facility`: Create a new facility (Admin only)
- `PUT /api/facility/:id`: Update a facility (Admin only)
- `DELETE /api/facility/:id`: Soft delete a facility (Admin only)
- `GET /api/facility`: Get all facilities

### Booking Routes
- `GET /api/check-availability`: Check facility availability
- `POST /api/bookings`: Create a booking (User only)
- `GET /api/bookings`: View all bookings (Admin only)
- `GET /api/bookings/user`: View user's bookings (User only)
- `DELETE /api/bookings/:id`: Cancel a booking (User only)

## 🛠 Error Handling

The application implements comprehensive error handling:
- Custom error classes for different types of errors
- Global error handling middleware
- Detailed error messages and stack traces in development mode

## 🔐 Authentication

- JWT-based authentication
- Role-based access control (User and Admin roles)
- Protected routes for authorized access only
