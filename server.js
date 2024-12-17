const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint pentru autentificare
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Citește fișierul users.txt
  fs.readFile("users.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Eroare la citirea fișierului:", err);
      return res.status(500).json({ message: "Eroare internă." });
    }

   //verificare username si parola din fisier
    const users = data.split("\n").map((line) => line.trim());
    const isValidUser = users.some((user) => {
      const [fileUsername, filePassword] = user.split(":");
      return fileUsername === username && filePassword === password;
    });

    if (isValidUser) {
      return res.json({ message: "Autentificare reușită!" });
    } else {
      return res.status(401).json({ message: "Nume de utilizator sau parolă incorecte." });
    }
  });
});

// Pornire server
app.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`);
});
