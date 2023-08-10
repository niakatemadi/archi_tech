const upload = require("../middlewares/multer");
const express = require("express");
const fileController = require("../controllers/fileController/fileController");
const { protect } = require("../functions/auth/authFunctions");

const router = express.Router();

//router.route("/download/:id").get(downloadFile);
//router.route("/").get(getFiles).post(upload.single("file"), addFile);
router.get("/:id", fileController.getFiles);

router.get("/download/:id", fileController.downloadFile);

router.post("/", upload.single("file"), fileController.addFile);

module.exports = router;