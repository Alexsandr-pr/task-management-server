const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const specializationRouter = require("./specializationRouter");
const notificationRouter = require("./notificationRouter");

router.use("/user", userRouter);
router.use("/specialization", specializationRouter)
router.use("/notification", notificationRouter)

module.exports = router
