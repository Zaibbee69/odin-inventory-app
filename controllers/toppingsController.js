const db = require("../db/queries")

async function getToppings(req, res) {

    const toppings = await db.getToppingsGroupedByCategory();

    res.render('toppings', { toppings, flash: { type: "success", message: "Topping added!" } })
}

async function addNewTopping(req, res) {
    const toppingCategories = await db.getToppingsGroupedByCategory();

    res.render("newToppings", { toppingCategories, flash: { type: "success", message: "Topping added!" } })
}

async function editTopping(req, res) {

}

async function removeTopping(req, res) {

}

module.exports = { getToppings, addNewTopping, editTopping, removeTopping }



