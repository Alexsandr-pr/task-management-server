const Router = require("express");
const specializationController = require("../controllers/specializationController");
const router = new Router();


router.post("/", specializationController.create);



module.exports = router;