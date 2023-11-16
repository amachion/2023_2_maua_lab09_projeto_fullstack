const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const app = express();
app.use (express.json());
app.use (cors());

async function conectarMongoDB() {
    await mongoose.connect(`mongodb+srv://pro_mac:mongo1234@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority`);
}
const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))
const usuarioSchema = mongoose.Schema ({
    login: {type: String, unique: true, required: true},
    senha: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model ("Usuario", usuarioSchema);

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
app.post ('/signup', async (req, res) => {
    try {
        const login = req.body.login;
        const senha = req.body.senha;
        const criptografada = await bcrypt.hash(senha, 2);
        const usuario = new Usuario({login: login, senha: criptografada});
        const respostaMongo = await usuario.save();
        console.log (respostaMongo);
        res.status(201).end();
    }
    catch (e) {
        console.log(e);
        res.status(409).end();
    }
})

app.listen (3000, () => {
    try {
        conectarMongoDB();
        console.log("conexão ok e app up & running");
    }
    catch (e) {
        console.log ("erro: ", e);
    }
})