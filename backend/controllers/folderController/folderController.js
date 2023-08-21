const folderModel = require("../../models/folderModel/folderModel");
const { asyncWrapper } = require("../../functions/functions");
const fileModel = require("../../models/fileModel/fileModel");
const userModel = require("../../models/userModel/userModel");

const addFolder = asyncWrapper( async (req, res) => {

  try {

    const { userId, folderLabel } = req.body
  
    const userFound = await userModel.findById(userId);
  
    const userFoundTotalFolderNumber = userFound.numberOfFolders;
    const newTotalFolderNumber = userFoundTotalFolderNumber + 1;
  
    await userModel.findByIdAndUpdate(userId, {numberOfFolders : newTotalFolderNumber});
  
    const userCreated = await folderModel.create({userId, folderLabel});
  
    res.status(201).json(userCreated);

  }catch(error){
    console.log(error);
  }
});

const deleteFolder = asyncWrapper( async (req, res) => {

  try {

      const userId = req.body.userId;
      console.log("userid backend");
      console.log(userId,userId)
      
    
      const userFound = await userModel.findById(userId);

      console.log("userFound",userFound)
    
      const userFoundTotalFolderNumber = userFound.numberOfFolders;
      console.log("userFoundTotalFolderNumber", userFoundTotalFolderNumber)
      const newTotalFolderNumber = userFoundTotalFolderNumber - 1;
    
     // await userModel.findByIdAndUpdate(userId, {numberOfFolders : newTotalFolderNumber});
    
      const folderId = req.params.id;
    
      const filesFound = await fileModel.find({folderId : folderId});

      const numberOfFiles = filesFound.length;

      console.log("numberoffiles",numberOfFiles);

      const newNumberOfFiles = userFound.numberOfFiles - numberOfFiles;
      console.log("filesFound",filesFound)

      const totalFilesSize = filesFound.reduce((acc, element) => acc + element.fileSizeMb ,0);

      console.log("totalfile size",totalFilesSize);

      const newTotalFileSize = userFound.totalStorageUsed - totalFilesSize;

     const userUpdated = await userModel.findByIdAndUpdate(userId, {numberOfFiles: newNumberOfFiles, numberOfFolders : newTotalFolderNumber, totalStorageUsed: newTotalFileSize});
    
      filesFound.map(async(file) => {
    
       const fileDeleted = await fileModel.findByIdAndDelete(file._id);
    
      })
    
      const folderFound = await folderModel.findByIdAndDelete(folderId);
    
      res.status(200).json(userUpdated);

  }catch(error){
    console.log(error);
  }
});


const getCurrentUserFolders = asyncWrapper( async (req, res) => {

  try{
    
      const foldersFound = await folderModel.find({userId: req.params.userId});
    
      res.status(200).json(foldersFound);

  }catch(error){
    console.log(error);
  }
});

const getFolders = asyncWrapper( async (req, res) => {

  try{
    
      const foldersFound = await folderModel.find();
    
      res.status(200).json(foldersFound);

  }catch(error){
    console.log(error);
  }
});

module.exports = { addFolder, getCurrentUserFolders, deleteFolder, getFolders };