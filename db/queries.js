const pool = require("./pool");

// ─────────────────────────────────────────
// TOPPING CATEGORY
// ─────────────────────────────────────────

async function getAllToppingCategories() {
    const { rows } = await pool.query(
        "SELECT * FROM topping_category ORDER BY name"
    );
    return rows;
}

async function getToppingCategoryById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM topping_category WHERE id = $1",
        [id]
    );
    return rows[0];
}

async function insertToppingCategory(name) {
    const { rows } = await pool.query(
        "INSERT INTO topping_category (name) VALUES ($1) RETURNING *",
        [name]
    );
    return rows[0];
}

async function updateToppingCategory(id, name) {
    const { rows } = await pool.query(
        "UPDATE topping_category SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );
    return rows[0];
}

async function deleteToppingCategory(id) {
    await pool.query(
        "DELETE FROM topping_category WHERE id = $1",
        [id]
    );
}

// ─────────────────────────────────────────
// TOPPING
// ─────────────────────────────────────────

async function getAllToppings() {
    const { rows } = await pool.query(`
    SELECT t.*, tc.name AS category_name
    FROM topping t
    JOIN topping_category tc ON t.category_id = tc.id
    ORDER BY tc.name, t.name
  `);
    return rows;
}

async function getToppingById(id) {
    const { rows } = await pool.query(`
    SELECT t.*, tc.name AS category_name
    FROM topping t
    JOIN topping_category tc ON t.category_id = tc.id
    WHERE t.id = $1
  `, [id]);
    return rows[0];
}

async function getToppingsByCategory(categoryId) {
    const { rows } = await pool.query(
        "SELECT * FROM topping WHERE category_id = $1 ORDER BY name",
        [categoryId]
    );
    return rows;
}

// Returns toppings grouped by their category — useful for the toppings page
async function getToppingsGroupedByCategory() {
    const { rows } = await pool.query(`
    SELECT
      tc.id   AS category_id,
      tc.name AS category_name,
      t.id    AS topping_id,
      t.name  AS topping_name
    FROM topping_category tc
    LEFT JOIN topping t ON t.category_id = tc.id
    ORDER BY tc.name, t.name
  `);

    // Group in JS before handing to EJS
    const grouped = {};
    rows.forEach(row => {
        if (!grouped[row.category_id]) {
            grouped[row.category_id] = {
                category: { id: row.category_id, name: row.category_name },
                toppings: []
            };
        }
        if (row.topping_id) {
            grouped[row.category_id].toppings.push({
                id: row.topping_id,
                name: row.topping_name
            });
        }
    });

    return Object.values(grouped);
}

async function insertTopping(name, categoryId) {
    const { rows } = await pool.query(
        "INSERT INTO topping (name, category_id) VALUES ($1, $2) RETURNING *",
        [name, categoryId]
    );
    return rows[0];
}

async function updateTopping(id, name, categoryId) {
    const { rows } = await pool.query(
        "UPDATE topping SET name = $1, category_id = $2 WHERE id = $3 RETURNING *",
        [name, categoryId, id]
    );
    return rows[0];
}

async function deleteTopping(id) {
    await pool.query("DELETE FROM topping WHERE id = $1", [id]);
}

// ─────────────────────────────────────────
// COOKING PREFERENCE
// ─────────────────────────────────────────

async function getAllCookingPreferences() {
    const { rows } = await pool.query(
        "SELECT * FROM cooking_preference ORDER BY name"
    );
    return rows;
}

async function getCookingPreferenceById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM cooking_preference WHERE id = $1",
        [id]
    );
    return rows[0];
}

async function insertCookingPreference(name) {
    const { rows } = await pool.query(
        "INSERT INTO cooking_preference (name) VALUES ($1) RETURNING *",
        [name]
    );
    return rows[0];
}

async function updateCookingPreference(id, name) {
    const { rows } = await pool.query(
        "UPDATE cooking_preference SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );
    return rows[0];
}

async function deleteCookingPreference(id) {
    await pool.query("DELETE FROM cooking_preference WHERE id = $1", [id]);
}

// ─────────────────────────────────────────
// PIZZA CATEGORY
// ─────────────────────────────────────────

async function getAllPizzaCategories() {
    const { rows } = await pool.query(
        "SELECT * FROM pizza_category ORDER BY name"
    );
    return rows;
}

async function getPizzaCategoryById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM pizza_category WHERE id = $1",
        [id]
    );
    return rows[0];
}

// Returns each pizza category with its pizzas nested — useful for categories page
async function getPizzaCategoriesWithPizzas() {
    const { rows } = await pool.query(`
    SELECT
      pc.id   AS category_id,
      pc.name AS category_name,
      p.id    AS pizza_id,
      p.name  AS pizza_name
    FROM pizza_category pc
    LEFT JOIN pizza p ON p.category_id = pc.id
    ORDER BY pc.name, p.name
  `);

    const grouped = {};
    rows.forEach(row => {
        if (!grouped[row.category_id]) {
            grouped[row.category_id] = {
                id: row.category_id,
                name: row.category_name,
                pizzas: []
            };
        }
        if (row.pizza_id) {
            grouped[row.category_id].pizzas.push({
                id: row.pizza_id,
                name: row.pizza_name
            });
        }
    });

    return Object.values(grouped);
}

async function insertPizzaCategory(name) {
    const { rows } = await pool.query(
        "INSERT INTO pizza_category (name) VALUES ($1) RETURNING *",
        [name]
    );
    return rows[0];
}

async function updatePizzaCategory(id, name) {
    const { rows } = await pool.query(
        "UPDATE pizza_category SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );
    return rows[0];
}

async function deletePizzaCategory(id) {
    await pool.query("DELETE FROM pizza_category WHERE id = $1", [id]);
}

// ─────────────────────────────────────────
// PIZZA
// ─────────────────────────────────────────

async function getAllPizzas() {
    const { rows } = await pool.query(`
    SELECT
      p.*,
      pc.name AS category_name,
      cp.name AS cooking_preference_name
    FROM pizza p
    JOIN pizza_category pc       ON p.category_id = pc.id
    LEFT JOIN cooking_preference cp ON p.cooking_preference_id = cp.id
    ORDER BY pc.name, p.name
  `);
    return rows;
}

async function getPizzaById(id) {
    const { rows } = await pool.query(`
    SELECT
      p.*,
      pc.name AS category_name,
      cp.name AS cooking_preference_name
    FROM pizza p
    JOIN pizza_category pc          ON p.category_id = pc.id
    LEFT JOIN cooking_preference cp ON p.cooking_preference_id = cp.id
    WHERE p.id = $1
  `, [id]);
    return rows[0];
}

async function getPizzasByCategory(categoryId) {
    const { rows } = await pool.query(`
    SELECT
      p.*,
      cp.name AS cooking_preference_name
    FROM pizza p
    LEFT JOIN cooking_preference cp ON p.cooking_preference_id = cp.id
    WHERE p.category_id = $1
    ORDER BY p.name
  `, [categoryId]);
    return rows;
}

// Full pizza detail — includes all toppings via the join table
async function getPizzaWithToppings(id) {
    const pizzaRows = await getPizzaById(id);
    if (!pizzaRows) return null;

    const { rows: toppingRows } = await pool.query(`
    SELECT t.id, t.name, tc.name AS category_name
    FROM pizza_topping pt
    JOIN topping t          ON pt.topping_id = t.id
    JOIN topping_category tc ON t.category_id = tc.id
    WHERE pt.pizza_id = $1
    ORDER BY tc.name, t.name
  `, [id]);

    return { ...pizzaRows, toppings: toppingRows };
}

async function insertPizza(name, categoryId, cookingPreferenceId, price) {
    const { rows } = await pool.query(
        `INSERT INTO pizza (name, category_id, cooking_preference_id, price)
     VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, categoryId, cookingPreferenceId, price]
    );
    return rows[0];
}

async function updatePizza(id, name, categoryId, cookingPreferenceId, price) {
    const { rows } = await pool.query(
        `UPDATE pizza
     SET name = $1, category_id = $2, cooking_preference_id = $3, price = $4
     WHERE id = $5 RETURNING *`,
        [name, categoryId, cookingPreferenceId, price, id]
    );
    return rows[0];
}

async function deletePizza(id) {
    await pool.query("DELETE FROM pizza WHERE id = $1", [id]);
}

// ─────────────────────────────────────────
// PIZZA TOPPING  (many-to-many)
// ─────────────────────────────────────────

async function getToppingsByPizza(pizzaId) {
    const { rows } = await pool.query(`
    SELECT t.id, t.name, tc.name AS category_name
    FROM pizza_topping pt
    JOIN topping t           ON pt.topping_id = t.id
    JOIN topping_category tc ON t.category_id = tc.id
    WHERE pt.pizza_id = $1
    ORDER BY tc.name, t.name
  `, [pizzaId]);
    return rows;
}

async function addToppingToPizza(pizzaId, toppingId) {
    const { rows } = await pool.query(
        `INSERT INTO pizza_topping (pizza_id, topping_id)
     VALUES ($1, $2)
     ON CONFLICT ON CONSTRAINT unique_pizza_topping DO NOTHING
     RETURNING *`,
        [pizzaId, toppingId]
    );
    return rows[0]; // undefined if topping was already on the pizza
}

async function removeToppingFromPizza(pizzaId, toppingId) {
    await pool.query(
        "DELETE FROM pizza_topping WHERE pizza_id = $1 AND topping_id = $2",
        [pizzaId, toppingId]
    );
}

// Replaces all toppings on a pizza in one go — handy for the edit pizza form
async function setPizzaToppings(pizzaId, toppingIds) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query("DELETE FROM pizza_topping WHERE pizza_id = $1", [pizzaId]);
        for (const toppingId of toppingIds) {
            await client.query(
                "INSERT INTO pizza_topping (pizza_id, topping_id) VALUES ($1, $2)",
                [pizzaId, toppingId]
            );
        }
        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

// ─────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────

module.exports = {
    // Topping Category
    getAllToppingCategories,
    getToppingCategoryById,
    insertToppingCategory,
    updateToppingCategory,
    deleteToppingCategory,

    // Topping
    getAllToppings,
    getToppingById,
    getToppingsByCategory,
    getToppingsGroupedByCategory,
    insertTopping,
    updateTopping,
    deleteTopping,

    // Cooking Preference
    getAllCookingPreferences,
    getCookingPreferenceById,
    insertCookingPreference,
    updateCookingPreference,
    deleteCookingPreference,

    // Pizza Category
    getAllPizzaCategories,
    getPizzaCategoryById,
    getPizzaCategoriesWithPizzas,
    insertPizzaCategory,
    updatePizzaCategory,
    deletePizzaCategory,

    // Pizza
    getAllPizzas,
    getPizzaById,
    getPizzasByCategory,
    getPizzaWithToppings,
    insertPizza,
    updatePizza,
    deletePizza,

    // Pizza Topping (join table)
    getToppingsByPizza,
    addToppingToPizza,
    removeToppingFromPizza,
    setPizzaToppings,
};