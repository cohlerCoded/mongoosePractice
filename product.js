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
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price must be positive dumbass!"],
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  catagories: {
    type: [String],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

productSchema.methods.greet = function () {
  console.log("Hello Hi Howdy!!!");
  console.log(`- from ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.isOnSale = !this.isOnSale;
  if (this.isOnSale) this.price = this.price * 0.5;
  else this.price = this.price * 2;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.catagories.push(newCat);
  return this.save();
};

const Product = mongoose.model("Product", productSchema);
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Fishing Rod" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors");
  console.log(foundProduct);
};

findProduct();
// const bike = new Product({
//   name: "Fishing Rod",
//   price: "200",
//   catagories: ["Sports/Outdoors", "Fishing", "Rods and Reels"],
//   qty: {
//     online: 50,
//   },
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("IT WORKED");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });

// Product.findOneAndUpdate(
//   { name: "Fishing Rod" },
//   { price: 100 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("IT WORKED");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });
