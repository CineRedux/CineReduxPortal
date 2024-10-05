const request = require('supertest');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the server for testing
module.exports = server;

afterAll(done => {
  server.close(done);
});

// Test cases
describe('GET /api/test', () => {
  it('should return 200 and a message', async () => {
    const response = await request(server).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Server is running' });
  });
});
