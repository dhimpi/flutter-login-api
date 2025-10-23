// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// data dummy sementara
let users = [
  { id: 1, username: 'admin', password: '12345' }
];

// ✅ GET: ambil semua user
app.get('/users', (req, res) => {
  res.json(users);
});

// ✅ POST: tambah user baru
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username dan password wajib diisi' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password
  };

  users.push(newUser);
  res.json({ message: 'User berhasil ditambahkan', user: newUser });
});

// ✅ PUT: update user berdasarkan id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const user = users.find(u => u.id == id);
  if (!user) {
    return res.status(404).json({ message: 'User tidak ditemukan' });
  }

  user.username = username || user.username;
  user.password = password || user.password;

  res.json({ message: 'User berhasil diupdate', user });
});

// ✅ DELETE: hapus user berdasarkan id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id != id);
  res.json({ message: 'User berhasil dihapus' });
});

// root untuk cek koneksi
app.get('/', (req, res) => {
  res.send('API Flutter Login aktif 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
