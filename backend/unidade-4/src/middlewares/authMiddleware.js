const jwt = require('jsonwebtoken');

/**
 * Middleware para verificação da autenticidade do Token JWT fornecido no header.
 * @param {import('express').Request} req - Objeto de requisição Express.
 * @param {import('express').Response} res - Objeto de resposta Express.
 * @param {import('express').NextFunction} next - Função de próximo passo na cadeia de execução.
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Esquema de autenticação inválido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_unyleya', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }

    req.userId = decoded.id;
    return next();
  });
};
