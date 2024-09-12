# Car Wash Booking System

[Live Deployment Link](https://car-wash-booking-system-two.vercel.app/)

[GitHub Repository Links](https://github.com/suhanurrahman007/Car-Wash-Server.git)

A backend application for managing a car wash booking system. Users can book various car wash services, manage bookings, and administrators can manage services and slots.

---


## **Story**

In a small town, Mr. Joe ran a car wash that made dreams come true. One day, a shy girl named Lily visited with her father. Mr. Joe encouraged her to paint, and her confidence grew. She later became a famous artist, remembering the magical car wash. This backend system is part of carrying on the legacy of Mr. Joe's magical car wash, designed to bring seamless booking and service management to life.

---

## **Table of Contents**

- [Car Wash Booking System](#car-wash-booking-system)
  - [**Story**](#story)
  - [**Table of Contents**](#table-of-contents)
  - [**Live Demo**](#live-demo)
  - [**Features**](#features)
  - [**Technologies Used**](#technologies-used)
  - [**Installation**](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
- [Server settings Environment Variables](#server-settings-environment-variables)
- [JWT Secrets](#jwt-secrets)
- [MongoDB URI](#mongodb-uri)
- [Other configurations](#other-configurations)

---

## **Live Demo**

Access the live application: [Live URL](https://car-wash-booking-system-two.vercel.app/)

---

## **Features**

- **User Management**: Sign up, login, and role-based access for users and admins.
- **Service Management**: Admins can create, update, soft-delete car wash services.
- **Slot Booking**: Users can book available slots for a car wash.
- **Booking History**: Users can view their booking history, and admins can view all bookings.
- **Vehicle Management**: Users can specify vehicle details for booking.
- **Role-based Authorization**: Access control for users and admins.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Programming Language**: TypeScript
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Zod for request validation
- **Error Handling**: Custom error handling middleware
- **Transaction & Rollback**: Transactional management where necessary

---

## **Installation**

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn (package manager)
- MongoDB (local or cloud instance)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/suhanurrahman007/Car-Wash-Server.git
   cd car-wash-booking-system
1. Install dependencies:
    ```bash
    npm install
# Server settings Environment Variables
PORT=5000

 ```bash
# JWT Secrets
JWT_ACCESS_SECRET=your-access-token-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=7d

# MongoDB URI
MONGO_URI=mongodb://localhost:27017/car-wash-booking-system

# Other configurations
NODE_ENV=development

