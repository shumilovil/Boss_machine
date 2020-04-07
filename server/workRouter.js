const express = require('express');
const workRouter = express.Router({mergeParams: true});

const processors = require('./db.js');
const getAllFromDatabase = processors.getAllFromDatabase;
const addToDatabase = processors.addToDatabase;
const getFromDatabaseById = processors.getFromDatabaseById;
const updateInstanceInDatabase = processors.updateInstanceInDatabase;
const deleteFromDatabasebyId = processors.deleteFromDatabasebyId;
const deleteAllFromDatabase = processors.deleteAllFromDatabase;
const createMeeting = processors.createMeeting;

workRouter.get('/', (req, res, next) => {
  const arrayOfWorks = getAllFromDatabase('work');
  let arrayOfThisMinionsWorks = [];
  for (let i = 0; i < arrayOfWorks.length; i++) {
    if (arrayOfWorks[i].minionId === req.id) {
      arrayOfThisMinionsWorks.push(arrayOfWorks[i]);
    };
  };
  res.status(200).send(arrayOfThisMinionsWorks);
});

workRouter.post('/', (req, res, next) => {
  const newWork = {
    title: req.body.title,
    description: req.body.description,
    hours: req.body.hours,
    minionId: req.id
  };
  const workToSend = addToDatabase('work', newWork);
  res.status(201).send(workToSend);
});

workRouter.put('/:workId', (req, res, next) => {
  if (req.params.workId !== req.id) {
    res.status(400).send('Ids are wrong');
    return;
  };

  const workToUpdate = {
    id: req.params.workId,
    title: req.body.title,
    description: req.body.description,
    hours: req.body.hours,
    minionId: req.id
  };
  const updatedWork = updateInstanceInDatabase('work', workToUpdate);
  res.status(200).send(updatedWork);
});

workRouter.delete('/:workId', (req, res, next) => {
  const arrayOfWorks = getAllFromDatabase('work');
  const deleteWork = deleteFromDatabasebyId('work', req.params.workId);
  if (deleteWork === true) {
    res.status(204).send(arrayOfWorks[req.params.workId]);
  }
  return;
});


module.exports = workRouter;
