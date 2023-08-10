const UserModel = require("../../models/userModel/userModel");
const { HashPassword, ComparePassword, ConvertToBase64, asyncWrapper } = require("../../functions/functions");
const { createJWT } = require("../../functions/auth/authFunctions");
const userModel = require("../../models/userModel/userModel");

const SignUp = async(req, res) => {

        const userFound = await UserModel.findOne({email : req.body.email});
    
        if( userFound!= null ){
          res.json({ message : "user already exist" });
    
          return;
        }

        req.body.password = await HashPassword(req.body.password)

        const newUser = await UserModel.create(req.body);

        const token = createJWT(newUser);

        res.status(200).json({user : newUser, token : token});
}

const LogIn = async(req, res) => {

    const userFound = await UserModel.findOne({email : req.body.email});

    if(userFound == null){

      res.status(200).json({ message : "adresse email incorrect !" });
      return;
    }

    const isSamePassword = await ComparePassword(req.body.password, userFound.password);

    if(isSamePassword == true){

      const token = createJWT(userFound);

      res.status(200).json({user : userFound, token: token});
      return;
    }

    res.status(200).json({ message : "Mot de passe incorrect !"})
}

const UpdateUserAvatar = asyncWrapper( async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  
  const filePath = req.file.path;
  const fileName = req.file.originalname;
  //const { base64Image } = req.body

  const user = await userModel.findByIdAndUpdate(userId,{ profileAvatar : filePath});

  res.status(200).json(user);
});

module.exports = {SignUp, LogIn, UpdateUserAvatar};