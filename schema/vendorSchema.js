const mongoose = require("mongoose");

const vendorSchema = {
  V_Id: {
    type: String
  },
  V_Name: {
    type: String
  },
  V_Phone: {
    type: String
  },
  V_Email: {
    type: String
  },
  V_Address: {
    type: String
  },

  V_ReturnAddress: {
    type: String
  },
  V_ProfileImage: {
    type: String
  },
  V_NIC: {
    type: String
  },
  V_IsActive: {
    type: String
  },
  V_City: {
    type: String
  },
  V_Country: {
    type: String
  }
};

module.exports = mongoose.model("Vendor", vendorSchema);
