const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (
    !email.includes('@')
    || !email.includes('.com')
  ) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (
    password.length < 6
  ) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (
    name.length < 3
  ) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (
    Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (
    watchedAt.split('/')[0].length !== 2
    || watchedAt.split('/')[1].length !== 2
    || watchedAt.split('/')[2].length !== 4
  ) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!parseInt(rate, 1) && (rate < 1 || rate > 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const isOkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || Object.values(talk).length < 2) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidWatchedAt,
  isValidRate,
  isOkTalk,
};