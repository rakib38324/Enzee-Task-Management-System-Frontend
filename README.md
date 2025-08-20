# 🌐 Task Management System – Frontend

This is the **frontend application** for the **Task Management System**.  
It is built with **Next.js**, **TypeScript**, and **TailwindCSS**.  
The frontend communicates with the backend (Express.js + MongoDB) via REST APIs to provide a smooth user experience.

---

### Frontend Live Link
```
https://enzee-task-management-frontend.vercel.app
```
### Backend Live Link
```
https://enzee-task-management-system-server.onrender.com
```
### Backend GitHub Link
```
https://github.com/rakib38324/Enzee-Task-Management-System-Server
```


## 🚀 Features

- 🔐 **Authentication**
  - Signup  
  - Login  
  - Email Verification  
  - Forgot & Reset Password  

- 📝 **Task Management**
  - Create Task  
  - Update Task  
  - Update Task Status (e.g., Pending → Completed)  
  - Delete Task  

- 🎨 **UI/UX**
  - Responsive and mobile-friendly design  
  - Styled with **TailwindCSS**  
  - Protected routes for authenticated users  

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-system.git
cd Enzee-Task-Management-System-Server
```

### 2. Install resources
```bash
npm install
```

### 3. .env file structure
```
NEXT_PUBLIC_API_BASE_URL=backend_live_link/api/v1

```

 ### 4. Start in development
```bash
npm run dev
```

 ### 6. Start in production
```bash
npm run build
npm start
```

# 🛠️ Design Choices

Email Verification System: Implemented to ensure only valid users can access the platform and to enhance account security.

JWT Authentication: Chosen for stateless, scalable authentication. Tokens are generated for access and refresh sessions.

Express + TypeScript: Provides type safety and a better developer experience.

MongoDB (Mongoose): Flexible document-based database for storing user and task data.

Separation of Concerns: Authentication, middleware, and task management are modularized for a clean architecture.

# ⚖️ Trade-offs & Assumptions

JWT over Sessions:
I chose JWT tokens for security and scalability. They allow stateless authentication, but the trade-off is that token invalidation is harder compared to session-based auth.

Access & Refresh Tokens:
I used short-lived access tokens for requests and long-lived refresh tokens for renewing sessions, balancing security vs. usability.

Email Provider Assumption:
Assumed that SMTP credentials (e.g., Gmail, SendGrid) would be available for email verification and password reset flows.

# ⚡ Challenges

Email Sending Issue on Vercel
When deploying the backend on Vercel, the email service did not work properly because serverless functions restrict long-running connections (like SMTP).

✅ Solution: I deployed the backend on Render, which supports persistent connections and SMTP, and kept the frontend on Vercel. This solved the email verification & password reset issue.

CORS Configurations
Had to explicitly configure CORS in Express to allow communication between frontend (Next.js) and backend (Render).

# ✅ Need Future Improvements

Add task categories & priority levels.

Add real-time updates with WebSockets (Socket.IO).

Implement unit & integration tests with Jest.

Deploy frontend (Next.js) + backend (Express) together in Docker for easier scaling.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
