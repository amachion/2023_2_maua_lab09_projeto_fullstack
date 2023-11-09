const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use (express.json());
app.use (cors());

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

async function conectarMongoDB() {
    await mongoose.connect(`mongodb+srv://pro_mac:mongo123@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority`);
}

const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

//acesso para requisição http-get /oi
app.get('/oi', (req, res) => {res.send('oi')});

//acesso para requisição http-get /filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
});

//acesso para requisição http-post /filmes, ou seja, vamos inserir um novo filme no banco
app.post ('/filmes', async (req, res) => {
    //obter dados que serão inseridos
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //montar o objeto json que será inserido
    const filme = new Filme({titulo: titulo, sinopse: sinopse});
    //inserir o novo filme no banco
    await filme.save();
    //trazemos do banco a coleção atualizada
    const filmes = await Filme.find();
    res.json(filmes);
});

app.listen (3000, () => {
    try {
        conectarMongoDB();
        console.log("conexão ok e app up & running");
    }
    catch (e) {
        console.log ("erro: ", e);
    }
})