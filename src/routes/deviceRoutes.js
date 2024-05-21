const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const multer = require("multer");
const path = require("path");
const checkJwt = require("../middelware/checkJwt");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

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

const checksJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const upload = multer({ storage: storage });
console.log(process.env.AUTH0_AUDIENCE, process.env.AUTH0_DOMAIN);
router.get("/", checksJwt, deviceController.getAllDevices);
router.get("/:id", checkJwt, deviceController.getDeviceById);
router.post(
  "/createdevice",
  checkJwt,
  upload.single("file"),
  deviceController.createDevice
);
router.put(
  "/:id",
  checkJwt,
  upload.single("file"),
  deviceController.updateDevice
);

router.delete("/:id", checkJwt, deviceController.deleteDevice);

module.exports = router;
