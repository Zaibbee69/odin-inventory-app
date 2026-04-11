const express = require("express");
const path = require('path');
require("dotenv").config()
const toppingsRouter = require("./routes/toppingsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter)
app.use("/toppings", toppingsRouter)
app.use("/categories", categoriesRouter)

app.listen(PORT, () => {
    console.log(`Listening at Port: ${PORT}`);
})