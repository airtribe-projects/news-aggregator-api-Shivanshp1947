const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT;

// Routes
const authRoute = require("./routes/AuthRoute");
const newsRoute = require("./routes/NewsRoute");
const preferenceRoute = require("./routes/PreferenceRoute");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Mounting
app.use("/users/preferences",preferenceRoute);
app.use("/users",authRoute);
app.use("/news",newsRoute);

const DB_Name = process.env.DB_Name;
const DB_Host = process.env.DB_Host;

mongoose.connect(DB_Host+DB_Name).then(() => {
    console.log("Connected to MongoDB");
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;