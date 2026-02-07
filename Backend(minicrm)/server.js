const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongo Connect
mongoose.connect("mongodb://localhost:27017/mini_crm")
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log(err));

// Route
app.use("/api/leads", require("./routes/leadRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));
