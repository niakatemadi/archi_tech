const express = require('express');
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const User = require("./models/userModel/userModel.js");

ConnectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/signUp", async(req,res) => {

    const userFound = await User.findOne({email : req.body.email});

    if( userFound!= null ){
      res.json({ message : "user already exist" });

      return;
    }
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
});

app.get("/logIn", async(req,res) => {
    const userFound = await User.findOne({email : req.body.email});

    if(userFound == null){

      res.status(200).json({ message : "adresse email incorrect !" });
      return;
    }

    if(userFound.password == req.body.password){
      res.status(200).json(userFound);
      return;
    }

    res.status(200).json({ message : "Mot de passe incorrect !"});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});