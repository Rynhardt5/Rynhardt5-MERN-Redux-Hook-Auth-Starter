const express = require("express");
const {
  getAllUsers,
  registerUser,
  currentUser,
  logUserIn,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/current", auth, currentUser);

router.post("/register", registerUser);

router.post("/login", logUserIn);

router.get("/", getAllUsers);

module.exports = router;
