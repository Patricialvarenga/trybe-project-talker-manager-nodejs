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

const talkerJson = 'talker.json';

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await fs.readFile(talkerJson, 'utf-8');
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
    const searchById = await fs.readFile(talkerJson, 'utf-8');
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

    try { 
    const readTalkers = await fs.readFile(talkerJson, 'utf-8');
     const talkersReady = JSON.parse(readTalkers);
     const id = talkersReady.length > 0 ? talkersReady[talkersReady.length - 1].id + 1 : 1;

     const newTalker = { id, name, age, talk: { watchedAt, rate } };

     talkersReady.push(newTalker);
     await fs.writeFile('talker.json', JSON.stringify(talkersReady));
     return res.status(201).json(newTalker);
    } catch (err) {
      return res.status(500).json({ err });
    }
   });

talkerRouter.put('/:id', isValidToken, isValidName, isValidAge,
isOkTalk, isValidWatchedAt, isValidRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  try {
    const editTalker = { id: Number(id), name, age, talk: { watchedAt, rate } };
    const newId = await fs.readFile(talkerJson, 'utf-8');
    const newIdReady = JSON.parse(newId);
    const indexOffId = newIdReady.findIndex((talker) => Number(talker.id) === Number(id));
    newIdReady[indexOffId] = editTalker;

    await fs.writeFile(talkerJson, JSON.stringify(newIdReady));
    return res.status(200).json(editTalker);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

talkerRouter.delete('/:id', isValidToken, async (req, res) => {
  const { id } = req.params;
  try {
    const idJson = await fs.readFile(talkerJson, 'utf-8');
    const idParse = JSON.parse(idJson).findIndex((talker) => Number(talker.id) !== Number(id));

    await fs.writeFile(talkerJson, JSON.stringify(idParse));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }); 
  } catch (err) {
    return res.status(500).json({ err });
  } 
});

module.exports = talkerRouter;
