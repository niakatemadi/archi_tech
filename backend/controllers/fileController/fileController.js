const fileModel = require("../../models/fileModel/fileModel");
const path = require("path");
const { asyncWrapper } = require("../../functions/functions");
const { findById } = require("../../models/userModel/userModel");
const userModel = require("../../models/userModel/userModel");

const getOneFile = async (req, res) => {
    try {
        const fileFound = await fileModel.findById(req.params.id);
        res.status(200).json({ fileFound });
        
    }catch(error){
        console.log(error);
    }
}

const addFile = asyncWrapper( async (req, res) => {
    try {
        const { fileLabel, userId } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileSizeMb = req.file.size;

        const userFound = await userModel.findById(userId);
        const userFoundTotalStorageUsed = userFound.totalSorageUsed;
        const newTotalStorageUsed = userFoundTotalStorageUsed + fileSizeMb;
    
        await userModel.findByIdAndUpdate(userId, {totalSorageUsed : newTotalStorageUsed});

        const file = await ifleModel.create({fileName, filePath, folderId : "456789", userId, fileLabel, fileSizeMb});
        res.status(201).json({ file })
    }catch(error){
        console.log(error);
    }
})

const deleteFile = asyncWrapper( async (req, res) => {
    try{

        const { userId, fileId, fileSizeMb } = req.body;

        const userFound = await userModel.findById(userId);

        const newTotalStorageUsed = userFound.totalSorageUsed - fileSizeMb;

        await userModel.findByIdAndUpdate(userId, {totalSorageUsed: newTotalStorageUsed});

        const fileDeleted = await fileModel.findOneAndDelete({_id : fileId});

        res.status(200).json(fileDeleted);


    }catch(error){
        console.log(error);
    }
})

const downloadFile = asyncWrapper(async (req,res) => {
 
    const fileFound = await fileModel.findById(req.params.id);
    if(!fileFound){
        return next(new Error("No file found"))
    }

    const fileName = fileFound.fileName;
    const fileLocalPath = path.join(__dirname, `../../uploads/${fileName}`);

    res.download(fileLocalPath);
})

module.exports = { getOneFile, addFile, downloadFile, deleteFile };