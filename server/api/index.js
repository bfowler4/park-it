const express = require(`express`);
const router = express.Router();

const passport = require(`passport`);
const LocalStrategy = require(`passport-local`);
const bcrypt = require(`bcrypt`);

const usersRoute = require(`./users`);
const spacesRoute = require(`./spaces`);
const User = require(`../db/models/User`);
const { isAuthenticated, isVerifiedUser } = require(`./Helpers/authenticator`);

const saltRounds = require(`../../config`).passport.saltRounds;

module.exports = router;

passport.serializeUser((user, done) => {
  console.log(`serializing user`);
  return done(null, {
    id: user.id,
    username: user.email
  });
});

passport.deserializeUser((user, done) => {
  console.log(`deserializing`);
  return new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.email
      });
    });
});

passport.use(new LocalStrategy({
  usernameField: `email`, // Set username field as the incoming email field
  passwordField: `password`
},
  (username, password, done) => {
    return new User({ email: username })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false, { message: `bad username or password` });
        } else {
          user = user.toJSON();
          bcrypt.compare(password, user.password)
            .then(res => {
              if (res) {
                return done(null, user);
              } else {
                return done(null, false, { message: `bad username or password` });
              }
            });
        }
      });
  })
);

// User authentication routes
router.post(`/register`, (req, res) => {
  return bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      let {
        first_name,
        last_name,
        email
      } = req.body;
      return new User({
        first_name,
        last_name,
        email,
        password: hash
      })
        .save()
        .then(user => {
          return res.json(user);
        })
        .catch(err => res.status(400).json({ message: err.message }));
    });
  });
});

router.post(`/login`, passport.authenticate(`local`), (req, res) => {
  return res.json(req.user);
});

router.post(`/logout`, (req, res) => {
  req.logout();
  return res.json({ message: `User logged out` });
});


// Routes below must be authenticated to be accessed
router.use(isAuthenticated);

// users and spaces routes
router.use(`/users/`, usersRoute);
router.use(`/spaces`, spacesRoute);