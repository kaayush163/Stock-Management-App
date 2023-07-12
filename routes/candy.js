const express = require('express');

const stockController = require('../controllers/candy');

const router = express.Router();

router.get('/get-candy',stockController.getCandy);

router.post('/post-candy',stockController.postCandy);

router.get('/delete-candy/:candId',stockController.deleteCandy);

module.exports = router;