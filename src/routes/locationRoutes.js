const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationsController");

router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);
router.post("/addlocation", locationController.createLocation);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
