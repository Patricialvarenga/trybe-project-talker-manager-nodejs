const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = require('./routers/loginRouter');
const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Run server http://localhost:3000');
});
