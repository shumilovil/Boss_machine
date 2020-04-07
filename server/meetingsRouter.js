const express = require('express');
const meetingsRouter = express.Router();

const processors = require('./db.js');
const getAllFromDatabase = processors.getAllFromDatabase;
const addToDatabase = processors.addToDatabase;
const getFromDatabaseById = processors.getFromDatabaseById;
const updateInstanceInDatabase = processors.updateInstanceInDatabase;
const deleteFromDatabasebyId = processors.deleteFromDatabasebyId;
const deleteAllFromDatabase = processors.deleteAllFromDatabase;
const createMeeting = processors.createMeeting;

let arrayOfMeetings = getAllFromDatabase('meetings');


meetingsRouter.get('/', (req, res, next) => {
  res.status(200).send(arrayOfMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  arrayOfMeetings.push(newMeeting);
  res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
  arrayOfMeetings = deleteAllFromDatabase('meetings');
  res.status(204).send(arrayOfMeetings);
});





module.exports = meetingsRouter;
