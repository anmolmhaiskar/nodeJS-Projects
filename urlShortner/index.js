const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const { connectToMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoute");
const userRouter = require("./routes/user");
const { checkForAuthentication, restrictTo, restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const PORT = 8001;

//Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner")
.then(() => console.log("MongoDB connected Successfully!!"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.json());
app.use( express.urlencoded( { extended : false  } ));
app.use(cookieParser());
app.use(checkForAuthentication);


//Routing
app.use("/urls", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
// app.use("/urls", restrictToLoggedInUserOnly, urlRouter);
app.use("/users", userRouter);
app.use("/", staticRouter);
// app.use("/", checkAuth, staticRouter);


app.listen(PORT, () => console.log(`Application Started Successfully and Listening on port ${PORT}`));