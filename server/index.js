const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const { MONGO_URL, PORT } = process.env;


mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB is  connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err));

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", indexRouter);