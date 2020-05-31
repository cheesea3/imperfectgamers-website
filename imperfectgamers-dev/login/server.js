const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Imperfect Gamers" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 5,
        name: "vip"
    });

    Role.create({
        id: 6,
        name: "rapper"
    });

    Role.create({
        id: 7,
        name: "dj"
    });

    Role.create({
        id: 4,
        name: "admin"
    });

    Role.create({
        id: 3,
        name: "moderator"
    });

    Role.create({
        id: 2,
        name: "owner"
    });
}
