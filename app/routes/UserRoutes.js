const express = require("express");
const router = express.Router();
const UserController = require("../http/controller/UserController");
const Auth = require("../http/middleware/Auth");



router.post('/api/users/register',UserController.registerUser);
router.post('/api/users/login',UserController.loginUser);
router.put('/api/users/edit/:id',UserController.editUser);
router.get('/api/me', UserController.postMe);




module.exports = router;