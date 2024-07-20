const Router = require("express");
const router = new Router();
const userController = require('../controllers/userController');
const {body} = require("express-validator")

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min:3, max:32}), 
    userController.registration);

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.post("/forgot", userController.forgotPassword);
router.post("/password", 
    body("email").isEmail(),
    body("password").isLength({min:3, max:32}),
    userController.changePasswordForgot);
router.get("/",  userController.users);
router.post("/password/change",  userController.changePassword);

module.exports = router;