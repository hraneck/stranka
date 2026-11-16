const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost", user: "root",
    password: "", database: "kniznica_db"
});

db.connect(error =>{
    if (error) console.log("Chyba databazy:", error);
    else console.log("Databaza pripojena");
})

app.get("/api/knihy", (req, res) => {
    db.query("SELECT * FROM knihy", (error, knihy) =>{
        if (error) return res.status(500). send("Chyba SQL");
        res.json(knihy);
    });
});

app.post("/api/knihy", (req, res) => {
    const { nazov, autor, rok, cena } = req.body;
    
    db.query("INSERT INTO knihy (nazov, autor, rok, cena) VALUES (?, ?, ?, ?)", [nazov, autor, rok, cena], error => {
        if (error) return res.status(500).send("Chyba SQL");
        res.send("Kniha pridana");
    });
});

app.delete("/api/knihy/:id", (req, res) => {
    db.query("DELETE FROM knihy WHERE id = ?", [req.params.id], error => {
        if(error) return res.status(500).send("Chyba SQL");
        res.send("Kniha vymazana");
    });
});

app.post("/api/knihy/:id/cena", (req, res) => {
    const zmena = Number(req.body.zmena);
    if (!Number.isFinite(zmena)) {
        return res.status(400).send("Neplatna zmena");
    }

    const sql = "UPDATE knihy SET cena = cena + ? WHERE id = ?";
    db.query(sql, [zmena, req.params.id], (error, vysledok) => {
        if (error) return res.status(500).send("Chyba SQL");
        if (!vysledok.affectedRows) return res.sendStatus(404);
        res.send("Cena knihy zmenena");
    });
});

app.put("/api/knihy/:id", (req, res) => {
    const { nazov, autor, rok, cena } = req.body;

    if (
        typeof nazov !== "string" || !nazov.trim() ||
        typeof autor !== "string" || !autor.trim() ||
        !Number.isInteger(rok) ||
        !Number.isFinite(cena) || cena < 0
    ) {
        return res.status(400).send("Neplatne udaje");
    }

    const sql = "UPDATE knihy SET nazov = ?, autor = ?, rok = ?, cena = ? WHERE id = ?";
    db.query(sql, [nazov.trim(), autor.trim(), rok, cena, req.params.id], error => {
        if (error) return res.status(500).send("Chyba SQL");
        res.send("Kniha upravena");
    });
});

app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/404.html");
});

//tento link nepouzivat, pretoze nepodporuje na mojom pocitaci prompt(), ktory sa pouziva pri 
// dynamickej zmene stranky, cez tlacidla zmenit cenu a uprav knihu. 
// Stranku otvaram napisanim linku http://localhost:3000/knihy.html do googlu
app.listen(3000, () => console.log("http://localhost:3000"));