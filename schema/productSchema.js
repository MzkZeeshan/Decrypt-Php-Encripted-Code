const mongoose = require("mongoose");
const productImages = new mongoose.Schema({
  productImg: {
    type: String
  }
})




const productSchema = new mongoose.Schema({
  orderId: {
    type: String
  },
  Images: [{ type: String }],
  Name: {
    type: String,
    required: true
  },
  Price: {
    type: String
  },

  SpecialPrice: {
    type: String
    // required: true
  },
  VendorId: {
    type: String
  },
  Quantity: {
    type: String
  },

  SmallDiscription: {
    type: String
  },
  LargeDiscription: {
    type: String
  },
  CategoryId: {
    type: String
  },
  SubCategoryId: {
    type: String
  },
  ModifiedDate: {
    type: String
  },
  View: {
    type: String
  },
  Ordered: {
    type: String
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false

  }
});

module.exports = mongoose.model("Product", productSchema);
