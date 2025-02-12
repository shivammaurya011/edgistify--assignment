# Edgistify Assignment

## Introduction
Edgistify Assignment is a full-stack e-commerce application. The frontend is built using **React**, while the backend is powered by **Node.js and Express**, with **MongoDB** as the database.

## Project Type
**Fullstack** (Frontend + Backend)

## Deployed Application
- **Frontend**: [Edgistify Frontend](https://edgistify-assignment-zeta.vercel.app/)
- **Backend**: [Edgistify API](https://edgistify-assignment-uza9.onrender.com)
- **Database**: Hosted on **MongoDB Atlas**

## Directory Structure
```
Edgistify/
├── server/              # Backend (Node.js, Express, MongoDB)
│   ├── config/           # Configuration files (DB, environment, etc.)
│   ├── controllers/      # Route handlers / Controllers
│   ├── middleware/       # Custom middleware (auth, error handling, etc.)
│   ├── models/           # Database models (Mongoose schemas)
│   ├── routes/           # API routes
│   ├── utils/            # Utility/helper functions
│   ├── validations/      # Data validation schemas
│   ├── server.js         # Main Express server file
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   ├── README.md         # Backend documentation
│   └── __tests__/        # Unit & integration tests (Jest)
│
├── client/             # Frontend (React, Redux, TailwindCSS)
│   ├── public/           # Static files (index.html, favicon, etc.)
│   ├── src/
│   │   ├── assets/       # Images, logos, icons, and other assets
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components (Home, Dashboard, etc.)
│   │   ├── redux/        # State management (Slices, Store)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Helper functions, API calls
│   │   ├── App.js        # Main App component
│   │   ├── index.js      # Entry point (ReactDOM render)
│   │   ├── tailwind.css  # TailwindCSS configuration
│   │   ├── package.json  # Frontend dependencies
│   ├── .env              # Frontend environment variables
│   ├── README.md         # Frontend documentation
│   └── __tests__/        # Unit & integration tests (Jest)
│
├── README.md             # Project documentation
```

## Video Walkthrough
- **Features Demo**: [[Insert Walkthrough Video Link](https://drive.google.com/file/d/1B3q6-H5GomSJMg8YtlgRN9KUcqvxQ0_O/view?usp=sharing)]
- **Codebase Overview**: [[Insert Codebase Overview Video Link](https://drive.google.com/file/d/1iIKLNABtMD-B8PC9tXEntn3URQRougqF/view?usp=sharing)]

## Features
- **User Authentication** (Google/Facebook OAuth, JWT-based login/logout)
- **Dynamic API Handling** (Flexible API request and response handling)
- **File Uploading** (Seamless file uploads using Multer/AWS S3)
- **Responsive UI** (TailwindCSS-based modern design)

## Design Decisions & Assumptions
- **Redux Toolkit** for efficient state management.
- **TailwindCSS** for styling instead of traditional CSS frameworks.
- **MongoDB** as the database due to its scalability and flexibility.

## Installation & Getting Started
Follow these steps to set up the project:

### Backend Setup
```bash
git clone https://github.com/your-repo.git
cd Edgistify/server
npm install
npm start
```

### Frontend Setup
```bash
cd Edgistify/client
npm install
npm start
```

## API Endpoints

### **Auth Routes**
| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| POST   | `/api/auth/login`     | User login |
| POST   | `/api/auth/register`  | User registration |
| GET    | `/api/auth/profile`   | Get user profile (authenticated) |
| POST   | `/api/auth/logout`    | User logout |

### **User Routes**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | `/api/users`     | Fetch all users |
| GET    | `/api/users/:id` | Fetch user by ID |
| PUT    | `/api/users/:id` | Update user details |
| DELETE | `/api/users/:id` | Delete user |

### **Category Routes**
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| GET    | `/api/categories`      | Fetch all categories |
| POST   | `/api/categories`      | Create a new category |
| GET    | `/api/categories/:id`  | Fetch category by ID |
| PUT    | `/api/categories/:id`  | Update category |
| DELETE | `/api/categories/:id`  | Delete category |

### **Product Routes**
| Method | Endpoint            | Description |
|--------|--------------------|-------------|
| GET    | `/api/products`   | Fetch all products |
| POST   | `/api/products`   | Create a new product |
| GET    | `/api/products/:id` | Fetch product by ID |
| PUT    | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### **Order Routes**
| Method | Endpoint           | Description |
|--------|------------------|-------------|
| GET    | `/api/orders`    | Fetch all orders |
| POST   | `/api/orders`    | Create a new order |
| GET    | `/api/orders/:id` | Fetch order by ID |
| PUT    | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Cancel/delete order |

## Technology Stack
- **Frontend**: React, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Google & Facebook OAuth
- **Deployment**: Vercel (Frontend), Render (Backend)

## Credentials
For testing authenticated pages, use:
- **Admin**: `admin123@gmail.com` / `Admin@123`
- **User**: `user123@gmail.com` / `User@123`

## Contributors
- **Shivam Maurya**

---

