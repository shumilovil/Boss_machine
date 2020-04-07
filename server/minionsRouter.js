const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./workRouter.js')

const processors = require('./db.js');
const getAllFromDatabase = processors.getAllFromDatabase;
const addToDatabase = processors.addToDatabase;
const getFromDatabaseById = processors.getFromDatabaseById;
const updateInstanceInDatabase = processors.updateInstanceInDatabase;
const deleteFromDatabasebyId = processors.deleteFromDatabasebyId;



const arrayMinions = getAllFromDatabase('minions');



minionsRouter.param('minionId', (req, res, next, id) => {
  const minionId = id;
  const minionIndex = arrayMinions.findIndex(minion => minion.id === minionId);
  if (minionIndex !== -1) {
    req.minionIndex = minionIndex;
    req.id = minionId;
    next();
  } else {
    res.status(404).send('Minion not found!');
  }
});



minionsRouter.get('/', (req, res, next) => {
  res.status(200).send(arrayMinions);
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = {
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: req.body.salary
  };
  const minionToSend = addToDatabase('minions', newMinion);
  res.status(201).send(minionToSend);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const exsistMinion = getFromDatabaseById('minions', req.id);
  res.status(200).send(exsistMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const minionToUpdate = {
    id: req.id,
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: req.body.salary
  };
  const updatedMinion = updateInstanceInDatabase('minions', minionToUpdate);
  res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleteMinion = deleteFromDatabasebyId('minions', req.id);
  if (deleteMinion === true) {
    res.status(204).send(arrayMinions[req.minionIndex]);
  }
  return;
});

minionsRouter.use('/:minionId/work', workRouter); 


module.exports = minionsRouter;
