const express = require('express');
const app = express();
app.use (express.json());

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

//acesso para requisição http-get /oi
app.get('/oi', (req, res) => {res.send('oi')});

//acesso para requisição http-get /filmes
app.get('/filmes', (req, res) => {res.send(filmes)});

//acesso para requisição http-post /filmes, ou seja, vamos inserir um novo filme na lista EEEMMMMM MEMÓÓÓRIA
app.post ('/filmes', (req, res) => {
    //obter dados que serão inseridos
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //montar o objeto json que será inserido
    const filme = {titulo: titulo, sinopse: sinopse};
    //inserir o novo filme no vetor filmes
    filmes.push(filme);
    //só para conferir
    res.send(filmes);
});

app.listen (3000, () => console.log("app up & running"));