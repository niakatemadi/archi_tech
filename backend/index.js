const express = require('express');
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const UserController = require("./controllers/userController/userController.js");

ConnectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/signUp", UserController.SignUp);

app.get("/logIn", UserController.LogIn);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});