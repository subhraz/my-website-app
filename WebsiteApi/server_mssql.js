const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());

const config = {
    server: "localhost",
    database: "WebsiteDemo",
    options: {
        instanceName: "SQLEXPRESS",
        trustServerCertificate: true
    },
    authentication: {
        type: "default"
    }
};

app.post("/saveContact", async (req, res) => {

    try {

        const name = req.body.name;

        await sql.connect(config);

        await sql.query`
            INSERT INTO Contacts(Name)
            VALUES(${name})
        `;

        res.send("Saved");

    }
    catch(err) {

        console.error(err);

        res.status(500).send(err.message);

    }

});

app.listen(5000, () => {
    console.log("API Running");
});