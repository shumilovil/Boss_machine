const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter.js');
const ideasRouter = require('./ideasRouter.js');
const meetingsRouter = require('./meetingsRouter.js');


apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
