const talkerRouter = require('express').Router();
const fs = require('fs').promises;

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

module.exports = talkerRouter;
