const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("website.db");

db.run(`
CREATE TABLE IF NOT EXISTS Contacts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT
)
`);

app.post("/saveContact", (req, res) => {

    const name = req.body.name;

    db.run(
        "INSERT INTO Contacts (Name) VALUES (?)",
        [name],
        function(err) {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send("Saved Successfully");
        }
    );

});

app.get("/contacts", (req, res) => {

    db.all(
        "SELECT * FROM Contacts",
        [],
        (err, rows) => {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.json(rows);
        }
    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

app.put("/contacts/:id", (req, res) => {

    const id = req.params.id;
    const name = req.body.name;

    db.run(
        "UPDATE Contacts SET Name = ? WHERE Id = ?",
        [name, id],
        function(err) {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send("Updated Successfully");
        }
    );

});

app.delete("/contacts/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM Contacts WHERE Id = ?",
        [id],
        function(err) {

            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send("Deleted Successfully");
        }
    );

});