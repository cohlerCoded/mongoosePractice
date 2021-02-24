const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log("connection refused", err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isOnSale: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({
  name: "Mountain Bike",
  price: "1000",
  isOnSale: false,
  color: "blue",
});

bike
  .save()
  .then((data) => {
    console.log("IT WORKED");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });
