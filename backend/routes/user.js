const express = require("express");
const router = express.Router();
const {
  getUser,
  signup,
  login,
  addEmail,
  updateUsername,
} = require("../controllers/user");

const { authenticate } = require("../middleware/user");

router.get("/getUser/:username", getUser);
router.post("/signup", signup);
router.post("/login",authenticate, login);
router.patch("/updateUsername", authenticate, updateUsername);

module.exports = router;
