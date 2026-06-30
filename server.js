const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Temporary storage for valid submissions
let submissions = [];

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Server-side validation function
function validateFormData(data) {
    const errors = [];

    // Validate Name
    if (!data.name || data.name.trim().length < 3) {
        errors.push("Name must be at least 3 characters long");
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Invalid email format");
    }

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\D/g, ""))) {
        errors.push("Phone number must be 10 digits");
    }

    // Validate Age
    const age = parseInt(data.age);
    if (!data.age || age < 18 || age > 120) {
        errors.push("Age must be between 18 and 120");
    }

    // Validate Password
    if (!data.password || data.password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    // Validate Confirm Password
    if (data.password !== data.confirmPassword) {
        errors.push("Passwords do not match");
    }

    // Validate Gender
    if (!data.gender) {
        errors.push("Gender is required");
    }

    return errors;
}

// Handle form submission
app.post("/submit", (req, res) => {
    console.log("Form data received:", req.body);
    
    // Validate server-side
    const validationErrors = validateFormData(req.body);
    
    if (validationErrors.length > 0) {
        console.log("Validation errors:", validationErrors);
        return res.status(400).send(`
            <h2 style="color: red;">Validation Failed!</h2>
            <p>${validationErrors.join("<br>")}</p>
            <a href="/">Go Back</a>
        `);
    }

    // Store validated data
    submissions.push({
        timestamp: new Date(),
        data: req.body
    });

    console.log("Total submissions:", submissions.length);
    
    res.send(`
        <h2 style="color: green;">Registration Successful!</h2>
        <p>Welcome, ${req.body.name}!</p>
        <p>Your data has been saved on the server.</p>
        <a href="/">Register Another User</a>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});