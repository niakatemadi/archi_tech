const express = require("express");
const { protect } = require("../functions/auth/authFunctions");
const folderController = require("../controllers/folderController/folderController");

const router = express.Router();

router.get("/", protect, folderController.getFolder);

router.post("/", protect, folderController.addFolder);

router.delete("/:id", protect, folderController.deleteFolder);

module.exports = router;