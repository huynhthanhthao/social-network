import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import connectDatabase from "./database/index.js";

// routers
import router from "./routes/index.js";

const app = express();

//connect database
connectDatabase();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
});

export default app;
