const express = require("express");
require("dotenv").config()
const toppingsRouter = require("./routes/toppingsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const indexRouter = require("./routes/indexRouter");
const app = express();
const PORT = 3000;



app.use("/", indexRouter)
app.use("/toppings", toppingsRouter)
app.use("/categories", categoriesRouter)

app.listen(PORT, () => {
    console.log(`Listening at Port: ${PORT}`);
})