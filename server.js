const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("Registration Successful!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});