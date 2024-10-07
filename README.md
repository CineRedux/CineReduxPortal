# CineRedux Customer Portal

CineRedux Customer Portal is a React-based web application that allows users to register, login, and make payments within the portal. The application features secure registration, login functionality, and integrates with backend APIs to manage user information and transactions.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
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

Additionally, you'll need the backend API running to handle requests. Ensure that the backend is properly configured and running locally or deployed.

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/cineredux-customer-portal.git
   cd cineredux-customer-portal
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables (if required by the backend).

4. Ensure that the `axiosConfig.js` file points to your backend URL:
   ```js
   const api = axios.create({
     baseURL: 'https://localhost:5001', // Update with your backend URL
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. The application will run at `http://localhost:3000/` by default.

## Usage

- **Register**: Navigate to `/register` and enter your details. All fields will be validated using regex patterns.
- **Login**: Once registered, you can log in via the `/login` page.
- **Payment**: After logging in, users can proceed to the `/payment` page for secure payments.

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

- **POST** `/api/payments`: For processing payments. Requires authentication.

You can find the backend source code or API details in the linked repository (not included in this README).

## Team Members

This project is a collaborative effort by the following team members:

- **Ted Ngobeni** - ST10027949
- **Tshiamo Thekiso** - ST10132516
- **Motjoka Fanana** - ST10089515

