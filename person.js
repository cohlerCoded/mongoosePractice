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

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function () {
    this.first = 'YO'
  console.log("about to save!!!");
});

personSchema.post("save", async function () {
    this.last = 'MAMA'
  console.log("saved!!!");
});

const Person = mongoose.model("Person", personSchema);
