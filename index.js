const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());  
app.use(express.static("public"));

app.use(routes);

// conexao com o banco de dados
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Conectado com sucesso!');
}).catch((err) => {
    console.log('Erro ao conectar: ' + err);
});


app.listen(5000, () => {
  console.log('Server started on port 5000');
});

