const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
const PORT = 8001;

//Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner")
.then(() => console.log("MongoDB connected Successfully!!"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

//Middleware
app.use(express.json());

//Default Page
app.get("/", (req, res) => res.end("This is HomePage"));

//Routing
app.use("/api/urls", urlRouter);


app.listen(PORT, () => console.log(`Application Started Successfully and Listening on port ${PORT}`));