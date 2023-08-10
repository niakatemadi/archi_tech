const express = require('express');
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const UserController = require("./controllers/userController/userController.js");
const filesRoutes = require("../backend/routes/filesRoutes.js");

ConnectDb();

// Middlewares
app.use(express.json());


// Routes
app.use("/api/v1/files", filesRoutes);
app.use("/folders", filesRoutes);
app.use("/invoices", filesRoutes);


// Authentication routes
app.post("/signUp", UserController.SignUp);
app.get("/logIn", UserController.LogIn);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});