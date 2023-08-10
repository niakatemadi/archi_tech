const upload = require("../middlewares/multer");
const express = require("express");
const { getFiles, addFile, downloadFile } = require("../controllers/fileController/fileController");
const { protect } = require("../functions/auth/authFunctions");

const router = express.Router();

router.route("/").get(getFiles).post(upload.single("file"), addFile);
router.route("/download/:id").get(downloadFile);

/*
router.post("/addFile", protect, (req,res) => {
    res.json("Hello file");
})*/

module.exports = router;