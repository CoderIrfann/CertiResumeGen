const express = require('express');
const app = express();
const port = 5000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!'); // Change this to send your desired response
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
