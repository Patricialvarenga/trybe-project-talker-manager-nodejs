const talkerRouter = require('express').Router();
const fs = require('fs').promises;

const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidWatchedAt,
  isValidRate,
  isOkTalk,
} = require('../middlewares/validationsTalker');

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await fs.readFile('talker.json', 'utf-8');
    const talkersReady = JSON.parse(talkers);
    if (!talkersReady) return res.status(200).json([]);
   return res.status(200).json(talkersReady);
  } catch (err) {
    return res.status(500).json({ err });
  }  
});

 talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const searchById = await fs.readFile('talker.json', 'utf-8');
    const searchByIdReady = JSON.parse(searchById)
    .find((talker) => talker.id === Number(id));

    if (!searchByIdReady) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }

    return res.status(200).json(searchByIdReady);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

talkerRouter.post('/', isValidToken, isValidName, isValidAge,
  isOkTalk, isValidWatchedAt, isValidRate, async (req, res) => {
     const { name, age, talk: { watchedAt, rate } } = req.body;

     const readTalkers = await fs.readFile('talker.json', 'utf-8');
     const talkersReady = JSON.parse(readTalkers);
     const id = talkersReady.length > 0 ? talkersReady[talkersReady.length - 1].id + 1 : 1;

     const newTalker = { id, name, age, talk: { watchedAt, rate } };

     talkersReady.push(newTalker);
     await fs.writeFile('talker.json', JSON.stringify(talkersReady));
     return res.status(201).json(newTalker);
   });

module.exports = talkerRouter;
