# Daily Blog 2.0

A modern full-stack blogging platform where users can register, log in (with email), and create, edit, and view blog posts. Built with Next.js (App Router), Node.js, Express, and MongoDB, fully deployed with Vercel and Render.

---

##  Features

-  User Authentication (Email/Password) (Google AUTH in PROGRESS)

-  JWT-based session handling
-  Create, view, edit, and delete blog posts
-  User-specific post feeds
-  Built with Next.js 15 (App Router) and Tailwind CSS
-  Backend deployed on Render, frontend on Vercel

---

##  Demo

 [Live Demo](https://daily-blog-2-0-2lfaykm5x-alexzhuzhous-projects.vercel.app/)


---

##  Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- `fetch` API for HTTP requests
- Context API for global auth state

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Passport.js](http://www.passportjs.org/) (Google OAuth Strategy)
- [JWT](https://jwt.io/) for authentication

## Local Development
### Backend
`cd backend`
`npm install`
`npm run dev`   # or: node app.js
### Frontend
`cd frontend`
`npm install`
`npm run dev`
### Project Structure
/frontend       # Next.js + Tailwind frontend

/backend        # Express + MongoDB backend
## Deployment
Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Made by @alexzhuzhou

