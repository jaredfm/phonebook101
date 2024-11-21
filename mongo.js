const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log("Give a password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://backGeek:${password}@phonebookcluster.ecbhz.mongodb.net/Contacts?retryWrites=true&w=majority&appName=phonebookCluster`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length < 4) {
  Contact.find({}).then(result => {
    console.log("Phonebook:\n");
    result.forEach(contact => {
      console.log(`${contact.name} | ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const newContact = new Contact ({
    name: process.argv[3],
    number: process.argv[4]
  });

  newContact.save().then(result => {
    console.log(`Added ${newContact.name} | ${newContact.number} to phonebook`);
    mongoose.connection.close();
  });
}
