const Location = require("../models/Location");

const locationController = {
  getAllLocations: async (req, res) => {
    try {
      const locations = await Location.find().populate("devices"); // Populate the 'devices' field
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getLocationById: async (req, res) => {
    try {
      const location = await Location.findById(req.params.id).populate(
        "devices"
      ); // Populate the 'devices' field
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createLocation: async (req, res) => {
    const deviceIds = req.body.devices || [];
    console.log(deviceIds);

    try {
      const location = new Location({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        devices: [...new Set(deviceIds)],
      });

      const newLocation = await location.save();
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a location by ID
  updateLocation: async (req, res) => {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }

      location.name = req.body.name || location.name;
      location.address = req.body.address || location.address;
      location.phone = req.body.phone || location.phone;

      if (req.body.devices) {
        const uniqueDeviceIds = [...new Set(req.body.devices)];
        location.devices = uniqueDeviceIds;
      }

      const updatedLocation = await location.save();

      res.json(updatedLocation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a location by ID
  deleteLocation: async (req, res) => {
    try {
      const location = await Location.findByIdAndDelete(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json({ message: "Location deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = locationController;
