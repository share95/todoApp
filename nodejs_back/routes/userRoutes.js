const express = require("express");

const router = express.Router();
const {registerUser, loginUser, loggedUser} = require("../controllers/UserController");
const validateToken = require("../middleware/validateTokenHandler");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logged-user", validateToken, loggedUser);

module.exports = router;
