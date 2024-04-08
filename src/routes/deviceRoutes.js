const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const multer = require("multer");
const path = require("path");

// Middleware for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", deviceController.getAllDevices);
router.get("/:id", deviceController.getDeviceById);
router.post(
  "/createdevice",
  upload.single("file"),
  deviceController.createDevice
);
router.put("/:id", upload.single("file"), deviceController.updateDevice);

router.delete("/:id", deviceController.deleteDevice);

module.exports = router;
