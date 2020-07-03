const mongoose = require("mongoose");

const userSchema = {
  U_Id: {
    type: String
  },
  U_Name: {
    type: String
  },
  U_Phone: {
    type: String
  },
  U_Email: {
    type: String
  },
  U_Address: {
    type: String
  },
  U_DoneOrder: {
    type: String
  },
  U_FavList: {
    type: String
  },
  U_City: {
    type: String
  },
  U_Country: {
    type: String
  }
};

module.exports = mongoose.model("User", userSchema);
