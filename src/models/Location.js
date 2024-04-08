const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

locationSchema.methods.addDevice = async function (deviceId) {
  this.devices.push(deviceId);
  await this.save();
};

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
