const express = require(`express`);
const session = require(`express-session`);
const passport = require(`passport`);
const Redis = require(`connect-redis`)(session);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const app = express();

const apiRoute = require(`./api`);

const secret = require(`../config`).passport.secret;
const PORT = process.env.PORT || 8080;

app.use(express.static(`public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  store: new Redis(),
  secret: secret,
  resave: false,
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(`/api`, apiRoute);

app.use(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `..`, `public`, `index.html`));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});