const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuração para aceitar JSON nas requisições
app.use(express.json());

// Middleware para permitir CORS
app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:5173', 'https://task-manager-frontend-eta.vercel.app']; // Adicione outras origens permitidas, se necessário

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true'); // Adiciona esta linha para permitir credenciais

    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Responde com OK para solicitações OPTIONS
    } else {
        next();
    }
});


// Configuração para usar as rotas definidas nos arquivos separados
app.use('/api', require('./src/router'));

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});

module.exports = app;
