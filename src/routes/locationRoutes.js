const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationsController");
const checkJwt = require("../middelware/checkJwt");

router.get("/", checkJwt, locationController.getAllLocations);
router.get("/:id", checkJwt, locationController.getLocationById);
router.post("/addlocation", checkJwt, locationController.createLocation);
router.put("/:id", checkJwt, locationController.updateLocation);
router.delete("/:id", checkJwt, locationController.deleteLocation);

module.exports = router;
