const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * Inicializa o servidor na porta configurada.
 */
app.listen(PORT, () => {
  console.log(`\nServidor da Pizzaria Unidade 4 iniciado com sucesso.`);
  console.log(`Endpoint base: http://localhost:${PORT}\n`);
});
