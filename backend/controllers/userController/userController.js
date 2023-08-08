const User = require("../../models/userModel/userModel");
const { HashPassword, ComparePassword } = require("../../functions/functions");

const SignUp = async(req, res) => {

        const userFound = await User.findOne({email : req.body.email});
    
        if( userFound!= null ){
          res.json({ message : "user already exist" });
    
          return;
        }

        req.body.password = await HashPassword(req.body.password)

        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
}

const LogIn = async(req, res) => {

    const userFound = await User.findOne({email : req.body.email});

    if(userFound == null){

      res.status(200).json({ message : "adresse email incorrect !" });
      return;
    }

    const isSamePassword = await ComparePassword(req.body.password, userFound.password);

    if(isSamePassword == true){
      res.status(200).json(userFound);
      return;
    }

    res.status(200).json({ message : "Mot de passe incorrect !"})
}

module.exports = {SignUp, LogIn};