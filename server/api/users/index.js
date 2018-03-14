const express = require(`express`);
const router = express.Router();
const User = require(`../../db/models/User`);
const Address = require(`../../db/models/Address`);
const Space = require(`../../db/models/Space`);
module.exports = router;

// Add a new user and get all users
router.route(`/`)
.post((req, res) => {
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
})
.get((req, res) => {
  return User
  .fetchAll()
  .then(users => {
    return res.json(users);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});


// Add an address to a user and get all addresses related to that user
router.route(`/:user_id/addresses`)
.post((req, res) => {
  const {
    street,
    apartment_number,
    city,
    state,
    zipcode
  } = req.body;
  const user_id = req.params.user_id;

  return new Address({
    street,
    apartment_number,
    city,
    state,
    zipcode,
    user_id
  })
  .save()
  .then(address => {
    return res.json(address);
  })
  .catch(err => res.status(400).json({ message: err.message }));
})
.get((req, res) => {
  return new Address()
  .query(qb => {
    qb.where({ user_id: req.params.user_id });
  })
  .fetchAll()
  .then(addresses => {
    return res.json(addresses);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});

// Get information for a user's address
router.route(`/:user_id/addresses/:address_id`)
.get((req, res) => {
  return new Address({ 
    id: req.params.address_id,
    user_id: req.params.user_id
  })
  .fetch({ require: true, withRelated: `spaces` })
  .then(address => {
    return res.json(address);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});

// Add a space to a user's address
router.route(`/:user_id/addresses/:address_id/spaces`)
.post((req, res) => {
  const {
    longitude,
    latitude,
    image_url,
    description
  } = req.body;
  const {
    user_id,
    address_id
  } = req.params;

  return new Space({
    longitude,
    latitude,
    image_url,
    description,
    user_id,
    address_id
  })
  .save()
  .then(space => {
    return res.json(space);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});

// Get all spaces owned by a specific user
router.route(`/:user_id/spaces`)
.get((req, res) => {
  return Space
  .fetchAll()
  .then(spaces => {
    return res.json(spaces);
  })
  .catch(err => res.status(400).json({ message: err.message }));
});