require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Contact = require('./models/contact.js');

const app = express();

morgan.token('data', (request, response) => JSON.stringify(request.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());
app.use(express.static('dist'));

let contacts = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const generateId = () => {
  return String(Math.floor(Math.random() * 10000));
}

const contactExist = (name) => {
  return contacts.find(contact => contact.name === name);
}

app.get('/info', (request, response) => {
  response.send(`<p> Phonebook has info for ${contacts.length} people <br /> <p> ${Date()} </p>`);
});

app.get('/api/contacts', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts);
  });
});

app.get('/api/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact);
  });
});

app.post('/api/contacts', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing"
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number missing"
    });
  }

  if (contactExist(body.name)) {
    return response.status(409).json({
      error: "The contact already exist"
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  });

  contact.save().then(newContact => {
    response.json(contact);
  });
});

app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id;
  contacts = contacts.filter(contact => contact.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
