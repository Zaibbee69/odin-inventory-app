function getCategories(req, res) {
    // GET /categories
    res.render('categories', {
        categories: [
            {
                id: 1,
                name: 'Classic',
                pizzas: [
                    { id: 1, name: 'Classic Pepperoni' },
                    { id: 2, name: 'Margherita' }
                ]
            },
            {
                id: 2,
                name: 'Chicken',
                pizzas: [
                    { id: 3, name: 'Chicken Delight' }
                ]
            }
        ],
        flash: { type: 'success', message: 'Category added!' } // optional
    });
}

module.exports = { getCategories }