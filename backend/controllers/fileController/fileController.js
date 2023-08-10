const FileModel = require("../../models/fileModel/fileModel");
const path = require("path");
const { asyncWrapper } = require("../../functions/functions");
const { findById } = require("../../models/userModel/userModel");

const getFiles = async (req, res) => {
    try {
        const files = FileModel.find();
        res.status(200).json({ files });

    }catch(error){
        console.log(error);
    }
}

const addFile = asyncWrapper( async (req, res) => {
    try {
        const { fileLabel } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const file = await FileModel.create({fileName, filePath, folderId : "456789", userId : "010101", fileLabel});
        res.status(201).json({ file })
    }catch(error){
        console.log(error);
    }
})

const downloadFile = asyncWrapper(async (req,res) => {
    const { id } = req.params;
    const file = await FileModel.findById(id);
    if(!file){
        return next(new Error("No file found"))
    }

    const fileName = file.fileName;
    const fileLocalPath = path.join(__dirname, `../../uploads/${fileName}`);

    res.download(fileLocalPath);
})

module.exports = { getFiles, addFile, downloadFile };