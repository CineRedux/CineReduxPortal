To create a detailed `README.md` file for your CineReduxPortal project, we’ll cover essential sections that give an overview of the project, its setup, technologies, usage, and other relevant information. Here’s a template you can customize:

---

# CineReduxPortal

CineReduxPortal is a movie management platform designed to allow users to explore movies, add them to a watchlist, and initiate secure international payments for premium features. This repository includes both the backend (Node.js) and frontend components of the CineRedux application.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Frontend](#starting-the-frontend)
  - [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

CineReduxPortal provides users with the ability to:
- Browse trending movies
- Add movies to their watchlist
- View detailed information about a selected movie
- Perform secure payments for premium features such as exclusive movie access using international payment systems

The project is divided into:
- **Backend**: API for managing movie data, watchlist, and payment transactions.
- **Frontend**: A user interface that communicates with the backend for movie details, watchlist management, and payment features.

## Features

- **Movie Search and Details**: Users can search for movies by name and view detailed information like title, overview, poster, year, and Rotten Tomatoes ratings.
- **Watchlist Management**: Users can add or remove movies from their watchlist.
- **International Payments**: Users can make secure payments for premium services.
- **Google Sign-In**: Users can log in using their Google account for a personalized experience.
  
## Technologies Used

### Backend
- **Node.js** with **Express**
- **MongoDB** (with Mongoose ODM)
- **Stripe** (for payment processing)
- **JWT** (for authentication)
- **Google Cloud Platform** (for deployment)
  
### Frontend
- **React** (or your chosen frontend framework)
- **HTML/CSS/JavaScript**
- **Axios** (for making API calls)
  
## Installation

### Prerequisites

- Node.js installed (v14.x or later)
- MongoDB (Local or Atlas instance)
- Git
- Stripe account (for payment processing)

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CineRedux/CineReduxPortal.git
   cd CineReduxPortal/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend/` directory and populate it with the following variables:

   ```plaintext
   PORT=5000
   MONGO_URI_LOCAL=mongodb://localhost:27017/CineRedux
   MONGO_URI_ATLAS=mongodb+srv://<username>:<password>@cluster.mongodb.net/CineRedux?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Environment Variables

You will need the following environment variables for the backend server:

```plaintext
PORT=5000
MONGO_URI_LOCAL=mongodb://localhost:27017/CineRedux
MONGO_URI_ATLAS=mongodb+srv://<username>:<password>@cluster.mongodb.net/CineRedux?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Example `.env` file:
```plaintext
PORT=5001
MONGO_URI_LOCAL="mongodb://localhost:27017/CineRedux"
MONGO_URI_ATLAS="mongodb+srv://username:password@cluster.mongodb.net/CineRedux?retryWrites=true&w=majority"
JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

## Usage

### Starting the Backend

```bash
cd backend
npm run dev
```

### Starting the Frontend

```bash
cd frontend
npm start
```

### API Endpoints

- **`POST /api/auth/register`**: Register a new user
- **`POST /api/auth/login`**: Log in a user
- **`GET /api/movies/trending`**: Fetch trending movies
- **`POST /api/payments/create`**: Create a new payment

Here’s an example of a payment request body:
```json
{
  "amount": 2500,
  "currency": "USD",
  "provider": "Bank of America",
  "beneficiaryName": "John Doe",
  "beneficiaryAccountNumber": "123456789",
  "swiftCode": "BOFAUS3N"
}
```

## Testing

To run tests, first install `jest` and other testing dependencies, then run:

```bash
npm test
```

You can add test cases for individual endpoints like user registration, movie fetching, and payment processing.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


## Team Members:
Ted Ngobeni - ST10027949 </br>
Tshiamo Thekiso – ST10132516 </br>
Motjoka Fanana – ST10089515
