const mongoose = require("mongoose");





const productSchema = new mongoose.Schema({
  ProductId: {
    type: String
  },
  Category: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  short_description: {
    type: String
  },

  description: {
    type: String
  },
  warranty_type: {
    type: String
  },
  brand: {
    type: String
  },
  SellerSku: {
    type: String
  },
  quantity: {
    type: String
  },
  price: {
    type: Number
  },
  special_price: {

  },
  special_from_date: {
    type: String
  },
  special_to_date: {
    type: String
  },
  seller_promotion: {
    type: String
  },
  package_content: {
    type: String
  },
  package_width: {
    type: String
  },
  package_height: {
    type: String
  },
  MainImage: {
    type: String
  },
  Image2: {
    type: String
  },
  Image3: {
    type: String
  },
  Image4: {
    type: String
  },
  Image5: {
    type: String
  },
  Status: {
    type: String
  },
  CreatedById: {
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

  },
  package_content: {
    type: String
  }
});

module.exports = mongoose.model("DarazProduct", productSchema);
