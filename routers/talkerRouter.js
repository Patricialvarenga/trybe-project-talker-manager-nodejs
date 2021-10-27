const router = require('express').Router();
const { readContentFile } = require('../readWriteFile');

const PATH_FILE = './talker.json';

router.get('/talker', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE);
  if (!talkers) return res.status(200).json([]);

  res.status(200).json(talkers);
});

module.exports = router;
