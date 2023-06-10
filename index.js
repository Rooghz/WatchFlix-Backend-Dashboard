const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moviesRoutes = require('./routes/movies');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

// Routes
app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <style>
            /* CSS styles */
            body {
              background-color: black;
              color: lime;
              margin: 0;
              padding: 0;
            }
  
            .terminal {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 80vh;
              font-family: monospace;
              font-size: 24px;
            }
          </style>
        </head>
        <body>
          <div class="terminal">
            Welcome to the WatchFlix API
          </div>
        </body>
      </html>
    `);
});


app.use('/api/movies', moviesRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
