const mongoose = require("mongoose");

const SelectedProduct = mongoose.Schema({
  ProductId: String,
  name: String,
  price: String,
  special_price: String
})

const orderSchema = mongoose.Schema({
  OrderId: {
    type: String
  },
  UserId: {
    type: String
  },
  UserName: {
    type: String
  },
  VendoeId: {
    type: String,
    default: "In Progress"
  },
  Status: {
    type: String,
    default: "pending"
  },
  SelectedProduct: [SelectedProduct],
  Address: {
    type: String
  },
  Phone: {
    type: String
  },
  Price: {
    type: String
  },
  AddressType: {
    type: String
  },
  City: {
    type: String
  },
  IsActive: {
    type: Boolean,
    default: true
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  DeliveryCharges: {
    type: Number
  }
});

module.exports = mongoose.model("Order", orderSchema);
