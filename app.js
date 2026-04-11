const express = require("express");
const toppingsRouter = require("./routes/toppingsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const app = express();
const PORT = 3000;



app.use("/toppings", toppingsRouter)
app.use("/categories", categoriesRouter)

app.listen(PORT, () => {
    console.log(`Listening at Port: ${PORT}`);
})