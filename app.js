const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});
const fruitSchema = new mongoose.Schema({
  name: String,
  // {
  //   type: String,
  //   required: [true,"Please check your data entry! No name is specified!"]
  // },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({

  rating: 8,
  review: "An cheeku a day: keeps the doctor away!"
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
const papita = new Fruit({
  name: "Papita",
  rating: 6,
  review: "Looks like a mango on steroids!"
});
papita.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});
const shreya = new Person({
  name: "Shreya Srivastava",
  age: 19,
  favouriteFruit: papita
});
// shreya.save();
// person.save();
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 9,
//   review: "Costly"
// });
// const orange = new Fruit({
//   name: "Orange",
//   rating: 9,
//   review: "Good for health"
// });
// const banana = new Fruit({
//   name: "Banana",
//   rating: 10,
//   review: "Very Good for digestion"
// });

// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully saved them all to fruits DB!");
//   }
// });
Person.updateOne({
  _id: "5edc7a6b15dcf73eac8abed2"
}, {
  favouriteFruit: papita
}, function(err) {
  if (err)
    console.log("hey bhagwaan error, bachaao bhagwaan");
  else
    console.log("Sab upar waaale ki kripa hai")
});
Fruit.find(function(err, fruits) {
  if (err)
    console.log(err);
  else {
    mongoose.connection.close();
    fruits.forEach(function(val) {
      console.log(val.name);
    });
  }
});

Person.updateOne({
  _id: "5edca40948035d33dcfc2b31"
}, {
  name: "Shreya Srivastava"
}, function(err) {
  if (err)
    console.log(err);
  else
    console.log("Succcessfully updated the content");
});
Person.deleteMany({
  name: "Shreya Srivastava"
}, function(err) {
  if (err)
    console.log(err);
  else
    console.log("Successfully deleted the content");
});
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
