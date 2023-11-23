const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuração para aceitar JSON nas requisições
app.use(express.json());

// Configuração para usar as rotas definidas nos arquivos separados
app.use('/api', require('./src/router'));

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;
