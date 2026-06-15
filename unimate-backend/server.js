const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

db.query("SELECT 1 AS test", (err, result) => {
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("UniMate Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});