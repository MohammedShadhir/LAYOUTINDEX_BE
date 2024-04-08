const Device = require("../models/Device");

// Controller methods for CRUD operations on devices
const deviceController = {
  // Get all devices
  getAllDevices: async (req, res) => {
    try {
      const devices = await Device.find();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single device by ID
  getDeviceById: async (req, res) => {
    try {
      const device = await Device.findById(req.params.id);
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json(device);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new device
  createDevice: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create a new device instance using the Device model
      const newDevice = new Device({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        type: req.body.type,
        image: req.file.filename,
        status: req.body.status,
      });

      // Save the new device to the database
      const savedDevice = await newDevice.save();

      console.log("Device created:", savedDevice);
      res.status(201).json(savedDevice);
    } catch (error) {
      console.error("Error creating device:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update a device by ID
  updateDevice: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const updatedDevice = {
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        type: req.body.type,
        image: req.file.filename,
        status: req.body.status,
      };

      const device = await Device.findByIdAndUpdate(
        req.params.id,
        updatedDevice,
        { new: true }
      );

      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }

      res.json(device);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a device by ID
  deleteDevice: async (req, res) => {
    try {
      const device = await Device.findByIdAndDelete(req.params.id);
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json({ message: "Device deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = deviceController;
