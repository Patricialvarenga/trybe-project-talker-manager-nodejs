const LoginRouter = require('express').Router();
const tokenOn = require('../middlewares/token');

const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/validationsTalker');

LoginRouter.post(
  '/',
  isValidEmail,
  isValidPassword,
  (_req, res) => res.status(200).json({ token: tokenOn() }),
);

module.exports = LoginRouter;