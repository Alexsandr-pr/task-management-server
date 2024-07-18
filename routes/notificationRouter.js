const Router = require("express");
const router = new Router();
const userNotification = require('../controllers/userNotificationController');



router.get("/:id", userNotification.getNotification);
router.put("/", userNotification.change);

module.exports = router;