function getToppings(req, res) {
    // GET /toppings
    res.render('toppings', {
        toppingsByCategory: [
            {
                category: { id: 1, name: 'Meats' },
                icon: '🥩',
                toppings: [{ id: 1, name: 'Pepperoni' }]
            },
        ],
        flash: { type: 'success', message: 'Topping added!' } // optional
    });
}

module.exports = { getToppings }