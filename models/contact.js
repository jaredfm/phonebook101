const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log("Connected to MongoDB");

    console.log("         *         ");
    console.log("        ***        ");
    console.log("       *****       ");
    console.log("      *******      ");
    console.log("     *********     ");
    console.log("    ***********    ");
    console.log("   *************   ");
    console.log("        |||        ");
    console.log("        |||        ");
    console.log("        ---        ");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error.message);
  });

const contactSchema = mongoose.Schema({
  name: String,
  number: String
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Contact', contactSchema);
