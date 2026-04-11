const { Router } = require("express");
const toppingsController = require("../controllers/toppingsController")

const toppingsRouter = Router();


toppingsRouter.get("/", toppingsController.getToppings)


module.exports = toppingsRouter;