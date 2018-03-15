const express = require(`express`);
const router = express.Router();
const usersRoute = require(`./users`);
const spacesRoute = require(`./spaces`);
const User = require(`../db/models/User`);
module.exports = router;

router.use(`/users`, usersRoute);
router.use(`/spaces`, spacesRoute);

router.post(`/register`, (req, res) => {
  console.log(`hellllo`)
  const {
    first_name,
    last_name,
    email,
    password
  } = req.body;

  return new User({ first_name, last_name, email, password })
  .save()
  .then(user => {
    return res.json(user);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});

router.post(`/login`, (req, res) => {
  const {
    email,
    password
  } = req.body;

  return new User({ email, password })
  .fetch()
  .then(user => {
    if (user) {
      return res.send(user);
    }
    return res.status(404).json({ message: `Invalid username or password` });
  })
  .catch(err => res.send(400).json({ message: err.message }));
});

router.post(`/logout`, (req, res) => {
  return res.json({ message: `User logged out` });
});