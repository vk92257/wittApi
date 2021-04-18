const express = require('express');
const wittController = require('./../wittController/wittRouteController.js');
const wittRouter = express.Router();

wittRouter.route('/login').post(wittController.login);
wittRouter.route('/sign_up').post(wittController.signUp);
wittRouter.route('/').get(wittController.protected, wittController.test);
module.exports = wittRouter;
