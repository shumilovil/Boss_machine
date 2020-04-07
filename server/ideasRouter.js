const express = require('express');
const ideasRouter = express.Router();

const processors = require('./db.js');
const getAllFromDatabase = processors.getAllFromDatabase;
const addToDatabase = processors.addToDatabase;
const getFromDatabaseById = processors.getFromDatabaseById;
const updateInstanceInDatabase = processors.updateInstanceInDatabase;
const deleteFromDatabasebyId = processors.deleteFromDatabasebyId;

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const arrayIdeas = getAllFromDatabase('ideas');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const ideaId = id;
  const ideaIndex = arrayIdeas.findIndex(idea => idea.id === ideaId);
  if (ideaIndex !== -1) {
    req.ideaIndex = ideaIndex;
    req.id = ideaId;
    next();
  } else {
    res.status(404).send('Idea not found!');
  }
});


ideasRouter.get('/', (req, res, next) => {
  res.status(200).send(arrayIdeas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = {
    name: req.body.name,
    description: req.body.description,
    weeklyRevenue: req.body.weeklyRevenue,
    numWeeks: req.body.numWeeks
  };
  const ideaToSend = addToDatabase('ideas', newIdea);
  res.status(201).send(ideaToSend);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  const exsistIdea = getFromDatabaseById('ideas', req.id);
  res.status(200).send(exsistIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const ideaToUpdate = {
    id: req.id,
    name: req.body.name,
    description: req.body.description,
    weeklyRevenue: req.body.weeklyRevenue,
    numWeeks: req.body.numWeeks
  };

  
  const updatedIdea = updateInstanceInDatabase('ideas', ideaToUpdate);
  res.status(200).send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleteIdea = deleteFromDatabasebyId('ideas', req.id);
  if (deleteIdea === true) {
    res.status(204).send(arrayIdeas[req.ideaIndex]);
  }
  return;
});




module.exports = ideasRouter;
