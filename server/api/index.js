const express = require(`express`);
const router = express.Router();
const usersRoute = require(`./users`);
const spacesRoute = require(`./spaces`);
module.exports = router;

router.use(`/users`, usersRoute);
router.use(`/spaces`, spacesRoute);

router.get(`/`, (req, res) => {
  return res.send(`api route smoke test`);
});