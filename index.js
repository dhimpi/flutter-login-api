const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Cek koneksi
app.get("/", (req, res) => {
  res.send("API Flutter Login is running on Railway!");
});

// Endpoint login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "12345") {
    res.json({
      success: true,
      message: "Login berhasil",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Username atau password salah",
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
