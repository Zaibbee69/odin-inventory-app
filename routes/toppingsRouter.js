const { Router } = require("express");
const toppingsController = require("../controllers/toppingsController")

const toppingsRouter = Router();


toppingsRouter.get("/", toppingsController.getToppings)
toppingsRouter.get("/new", toppingsController.addNewTopping)
toppingsRouter.put("/:id/edit", toppingsController.editTopping)
toppingsRouter.delete("/:id/", toppingsController.removeTopping)


module.exports = toppingsRouter;