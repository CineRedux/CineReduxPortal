# CineRedux Customer Portal

CineRedux Customer Portal is a React-based web application that allows users to register, login, and make payments within the portal. The application features secure registration, login functionality, and integrates with backend APIs to manage user information and transactions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Team Members](#team-members)


## Features

- **Registration**: Allows users to register by providing details such as email, full name, ID number, account number, and password.
- **Login**: Enables users to authenticate using their credentials.
- **Payments**: Users can make payments securely via the payment page.
- **Routing**: Navigation between pages like Home, Register, Login, and Payment.
- **Validation**: The form data is validated against specified regex patterns.
- **Error Handling**: User-friendly error messages are displayed on validation or backend failures.

## Technologies

The CineRedux Customer Portal uses the following technologies:

- **Frontend**:
  - React.js: For building the UI and handling the client-side routing.
  - Axios: For HTTP requests to the backend.
  - React Router: For navigating between different pages.
  - CSS: For styling the components.
  
- **Backend**:
  - The app communicates with an Express.js backend API (not included here) for user registration, login, and payment processing.
  
## Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

Additionally, you'll need the backend API running to handle requests. Ensure that the backend is properly configured and running locally or deployed.

## Installation

### 1. Clone this repository:
   ```bash
   git clone https://github.com/CineRedux/CineReduxPortal
   cd CineReduxPortal
   ```

### 2. Setup frontend:
Navigate to the frontend directory and install the dependencies
   ```bash
    cd frontend
    npm install
   ```

### 3. Setup backend
Navigate to the backend directory and install the dependencies
  ```bash
    cd backend
    npm install
   ```
### 4. Setup Environment Variables
Both the frontend and backend have sample environment variable files (.env.sample).
#### Frontend
Rename .env.sample to .env and configure the following:
```bash
HTTPS=true
PORT=5000
SSL_CRT_FILE=path_to_certificate.pem
SSL_KEY_FILE=path_to_privatekey.pem
```
#### Backend
Rename .env.sample to .env and configure the following:
```bash
PORT=5001
MONGO_URI_LOCAL=your_local_mongo_uri
MONGO_URI_ATLAS=your_atlas_mongo_uri
JWT_SECRET=your_jwt_secret
```

## Running the application
### 1. Running the Frontend
To start the frontend (React), run the following command inside the frontend directory:
```bash
  npm start
```
This will start the React app on the port specified in the .env file (default is 5000)

### 2. Running the Backend
To start the backend (Express), run the following command inside the backend directory:
```bash
npm run dev
```
This will start the backend server on the port specified in the .env file (default is 5001).

### 3. SSL Setup
For HTTPS to work, ensure that the paths to your certificate (SSL_CRT_FILE) and private key (SSL_KEY_FILE) in the frontend's .env file are correct.</br> The backend also requires SSL keys for secure communication.


## Usage

- **Register**: Navigate to `/register` and enter your details. All fields will be validated using regex patterns.
- **Login**: Once registered, you can log in via the `/login` page.
- **Payment**: After logging in, users can proceed to the `/payment` page for secure payments.
- **Dashboard**: While logged in, users can view all their past payments by going to the `/dashboard` page.

### Form Validation Regex

The registration form fields are validated against the following patterns:

- **Email**: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- **Full Name**: `^[A-Za-z\s]{2,50}$`
- **ID Number**: `^\d{13}$`
- **Account Number**: `^\d{10,12}$`
- **Password**: `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$`

## Project Structure

```bash
├── public
│   └── index.html            # Main HTML template
├── src
│   ├── components
│   │   ├── Home.js           # Home Page Component
│   │   ├── Register.js       # Register Page Component
│   │   ├── Login.js          # Login Page Component
│   │   ├── Payment.js        # Payment Page Component
│   ├── App.js                # Main Application Component
│   ├── axiosConfig.js        # Axios API Configuration
│   ├── index.js              # Entry point of the application
│   ├── styles
│   │   └── App.css           # Application-wide CSS styles
└── package.json              # Project metadata and dependencies
```

## API Routes

Ensure the backend API is properly set up with the following routes:

- **POST** `/api/users/register`: For user registration. Expects the following fields:
  - `email`
  - `fullName`
  - `idNumber`
  - `accountNumber`
  - `password`
  
- **POST** `/api/users/login`: For user authentication. Expects:
  - `email`
  - `password`

- **POST** `/api/payments/create`: For processing payments. Requires authentication.
- **GET** `/api/payments`: For viewing all payments made by the current user

You can find the backend source code or API details in the linked repository (not included in this README).

## YouTube Video

https://youtu.be/otMc5gph7AE

## Team Members

This project is a collaborative effort by the following team members:

- **Ted Ngobeni** - ST10027949
- **Tshiamo Thekiso** - ST10132516
- **Motjoka Fanana** - ST10089515


