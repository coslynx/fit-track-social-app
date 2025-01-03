<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
  Fitness Tracker App
</h1>
<h4 align="center">Track your fitness goals and share progress with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-F7DF1E" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248" alt="MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fit-track-social-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fit-track-social-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fit-track-social-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) for a Fitness Tracker application. It allows users to set fitness goals, track progress, and share achievements with friends, leveraging React for the frontend and Node.js for the backend with a MongoDB database.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **Authentication**   | Secure user registration and login using JWT for session management.  |
| 🎯 | **Goal Setting**    | Users can define fitness goals, including name, description, target date, and target value.  |
| 📈 | **Progress Tracking**  | Users can track the progress of their goals, mark goals as complete or incomplete.       |
| 📊 | **Dashboard**  | Provides a user dashboard to view fitness statistics and track progress of set goals.    |
| ⚙️ | **Architecture**   | The codebase follows a structured architecture with distinct directories for components, pages, hooks, and contexts for better maintainability.            |
| 🔗 | **Dependencies**   | Uses essential libraries like React Router, Formik, Yup, and Axios, along with Mongoose for MongoDB interactions and jsonwebtoken and bcrypt for authentication.       |
| 🧩 | **Modularity**     |  Modular component design for easy updates and extensions with common components for buttons, inputs, and auth forms. |
| 🧪 | **Testing**        | Includes basic unit tests for core components with React Testing Library.  |
| ⚡️  | **Performance**    |  Optimized for initial MVP launch, with consideration for future performance enhancements.   |
| 🔐 | **Security**       | Secure authentication with JWT tokens and password hashing using bcrypt.    |
| 🔌 | **Integrations**   |  Communicates with a Node.js backend using a RESTful API.   |
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub. |
| 📶 | **Scalability**    | Designed to be scalable by using reusable components and scalable database.    |

## 📂 Structure
```text
src
├── components
│   ├── common
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── auth
│   │   └── AuthForms.jsx
│   ├── dashboard
│   │   └── DashboardStats.jsx
│   └── goals
│       └── GoalItem.jsx
├── pages
│   ├── Home.jsx
│   └── Dashboard.jsx
├── hooks
│   └── useAuth.js
├── contexts
│   └── AuthContext.js
├── services
│   └── api.js
├── utils
│   └── helpers.js
└── styles
    └── global.css
public
├── index.html
└── favicon.ico
api
├── controllers
│   ├── authController.js
│   └── goalController.js
├── models
│   ├── userModel.js
│   └── goalModel.js
├── routes
│   ├── authRoutes.js
│   └── goalRoutes.js
├── middlewares
│   └── authMiddleware.js
└── services
    ├── authService.js
    └── goalService.js
config
    └── database.js
tests
  └── components
    └── Button.test.jsx
assets
  └── images
.env
package.json
README.md
startup.sh
commands.json

```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18.17.1 or higher
> - npm v9.6.7 or higher
> - MongoDB v6.0 or higher
> - Git
> - Docker (optional for database)

### 🚀 Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/coslynx/fit-track-social-app.git
    cd fit-track-social-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up the database:
    - **Option 1: Using Docker**
        ```bash
        docker-compose up -d mongodb
        ```
    - **Option 2: Manual Setup**
        - Make sure you have MongoDB installed and running.
        - Update the `VITE_DB_URL` in the `.env` file to your MongoDB connection string.
4. Configure environment variables:
    ```bash
    cp .env.example .env
    # Fill in the necessary environment variables in the .env file
    ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Start the backend server:
     ```bash
      # Using docker
        docker-compose up -d api

      # Or manually from api dir
      cd api
      npm install
      node server.js
    ```
3. Access the application:
    - Web interface: [http://localhost:5173](http://localhost:5173)
    - API endpoint: [http://localhost:3001/api](http://localhost:3001/api)

> [!TIP]
> ### ⚙️ Configuration
> - The application's configurations are managed through the `.env` file, which includes settings for the API base URL, JWT secret, and database connection.
> - To modify any settings, update the corresponding variables in the `.env` file and restart the application.
> - Make sure to use the `.env.example` as a template to create the `.env` file.

### 📚 Examples
Provide specific examples relevant to the MVP's core features. For instance:

- 📝 **User Registration**:
    ```bash
    curl -X POST http://localhost:3001/api/auth/register \
         -H "Content-Type: application/json" \
         -d '{"email": "user@example.com", "password": "securepass123", "name": "newuser"}'
    ```
- 📝 **User Login**:
     ```bash
    curl -X POST http://localhost:3001/api/auth/login \
         -H "Content-Type: application/json" \
         -d '{"email": "user@example.com", "password": "securepass123"}'
    ```

- 📝 **Creating a Goal**:
    ```bash
    curl -X POST http://localhost:3001/api/goals \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -d '{"name": "Run a Marathon", "description": "Complete a full marathon", "targetDate": "2024-12-31", "targetValue": 26.2}'
    ```

- 📝 **Updating a Goal**:
        ```bash
        curl -X PUT http://localhost:3001/api/goals/YOUR_GOAL_ID \
             -H "Content-Type: application/json" \
            -H "Authorization: Bearer YOUR_JWT_TOKEN" \
            -d '{"completed": true}'
        ```

## 🌐 Hosting
### 🚀 Deployment Instructions
Provide detailed, step-by-step instructions for deploying to the most suitable platform for this MVP. For example:

#### Deploying to a VPS/Cloud Server
1. Ensure you have a VPS or cloud server running Node.js and MongoDB.
2. Clone the repository onto the server:
    ```bash
    git clone https://github.com/coslynx/fit-track-social-app.git
    cd fit-track-social-app
    ```
3. Install dependencies for both frontend and backend
    ```bash
     npm install
     cd api
     npm install
     cd ..
    ```
4. Build the React frontend for production.
    ```bash
    npm run build
    ```
5. Copy the `dist` folder from the `client` directory and place it in the `public` directory of the `api` folder.
6. Set up the required environment variables in the `.env` file on the server.
7. Start the server.
    ```bash
     cd api
     node server.js
    ```

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:

- `VITE_API_BASE_URL`: Base URL for the API server.
  Example: `http://localhost:3001/api`
- `VITE_JWT_SECRET`: Secret key for JWT token generation.
    Example: `abcdefghijklmnopqrstuvwxyz123456`
- `VITE_DB_URL`: MongoDB connection string.
  Example: `mongodb://localhost:27017/fitness_tracker`
 - `VITE_PORT`: Port for the api server
   Example: `3001`

## 📜 API Documentation
### 🔍 Endpoints
Provide a comprehensive list of all API endpoints, their methods, required parameters, and expected responses. For example:

- **POST /api/auth/register**
    - Description: Register a new user
    - Body: `{ "email": string, "password": string, "name": string }`
    - Response: `{ "success": boolean, "message": string, "user": { "id": string, "name": string, "email": string }, "token": string }`
- **POST /api/auth/login**
    - Description: Logs in an existing user
    - Body: `{ "email": string, "password": string }`
    - Response: `{ "success": boolean, "message": string, "user": { "id": string, "name": string, "email": string }, "token": string }`
- **POST /api/auth/logout**
    - Description: Logs out a user
    - Response: `{ "success": boolean, "message": string }`
- **POST /api/goals**
    - Description: Creates a new goal
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "name": string, "description": string, "targetDate": string, "targetValue": number }`
    - Response: `{ "success": boolean, "message": string, "data": object }`
- **GET /api/goals**
    - Description: Get all goals for the user
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `Array of goals`
- **PUT /api/goals/:id**
     - Description: Updates a specific goal
     - Headers: `Authorization: Bearer TOKEN`
     - Body: `{ "name": string, "description": string, "targetDate": string, "targetValue": number, "completed": boolean}`
     - Response: `{ "success": boolean, "message": string, "data": object }`
- **DELETE /api/goals/:id**
     - Description: Deletes a specific goal
     - Headers: `Authorization: Bearer TOKEN`
     - Response: `{ "success": boolean, "message": string }`

### 🔒 Authentication
Explain the authentication process in detail:

1. Register a new user or login to receive a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. Tokens expire after 2 hours.

### 📝 Examples
Provide comprehensive examples of API usage, including request and response bodies:

```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123", "name": "newuser"}'

# Response
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "6663e92105739a2e9127e556",
    "name": "newuser",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjNlOTIxMDU3MzlhMmU5MTI3ZTU1NiIsImlhdCI6MTcxNzA0MTkwNCwiZXhwIjoxNzE3MDQ4OTA0fQ.qM_yWqg_0d_7r0y8_2T9Ue9c_2h_6j_8i_0Q_3v_1_c"
}

# Login an existing user
curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123"}'

# Response
{
    "success": true,
    "message": "Login successful",
    "user": {
        "id": "6663e92105739a2e9127e556",
        "name": "newuser",
        "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjNlOTIxMDU3MzlhMmU5MTI3ZTU1NiIsImlhdCI6MTcxNzA0MTk1MSwiZXhwIjoxNzE3MDQ4OTUxfQ.WdZ7uI1W017_3_Yp0g7_6_lU8R_3yT_6_2Z_zU_9_5_k"
}

# Create a new goal
curl -X POST http://localhost:3001/api/goals \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{"name": "Run a Marathon", "description": "Complete a full marathon", "targetDate": "2024-12-31", "targetValue": 26.2}'

# Response
{
    "success": true,
    "message": "Goal created successfully",
    "data": {
        "userId": "6663e92105739a2e9127e556",
        "name": "Run a Marathon",
        "description": "Complete a full marathon",
        "targetDate": "2024-12-31T00:00:00.000Z",
        "targetValue": 26.2,
        "completed": false,
        "createdAt": "2024-06-08T15:20:13.618Z",
        "updatedAt": "2024-06-08T15:20:13.618Z",
        "id": "6663e93d05739a2e9127e557"
    }
}

```

[Add more examples covering all major API functionalities]

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: fit-track-social-app
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>