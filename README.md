💬 Connection - Real-Time Chat Application
📖 Overview

Connection is a full-stack real-time chat application built with the MERN Stack.
It enables users to communicate instantly through live messaging while providing secure authentication and a modern, responsive user interface.

The project demonstrates real-world full-stack development using React, Node.js, Express, MongoDB, and Socket.IO.

✨ FEATURES
User Authentication (JWT)
Real-Time Messaging with Socket.IO
User Registration & Login
Online/Offline Status
Typing Indicators (if implemented)
Chat History
Responsive Design
Password Encryption using bcrypt
Cloudinary Image Upload (if implemented)
Fast REST APIs
Modern UI

TECH STACK
Frontend
React.js, React Router, Axios, CSS

Backend
Node.js, Express.js, Socket.IO, JWT, bcrypt

Database
MongoDB, Mongoose

Deployment
Render

Install Dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd Backend
npm install
```
---
Environment Variables

Create a `.env` file inside the server folder.
```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```
---

Run the Project
Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```
API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /signup | Register User |
| POST | /login | Login User |
| GET | /users | Get Users |
| GET | /messages | Get Messages |
| POST | /messages | Send Message |

Future Improvements
- Group Chat
- Voice Calling
- Video Calling
- Read Receipts
- Typing Indicator
- Emoji Support
- Message Search
- Push Notifications
- Dark Mode

WHAT I LEARNED
- MERN Stack Development
- Socket.IO
- JWT Authentication
- MongoDB & Mongoose
- REST API Development
- React Context API
- Responsive UI
- Deployment using Render

👨‍💻 Author
Muhammad Sinan
