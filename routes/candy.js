const express = require('express');

const stockController = require('../controllers/candy');
const userAuthenticate=require('../middleware/auth');

const router = express.Router();

router.get('/get-candy',userAuthenticate.authenticate,stockController.getCandy);

router.post('/post-candy',userAuthenticate.authenticate,stockController.postCandy);

router.get('/delete-candy/:candId',userAuthenticate.authenticate, stockController.deleteCandy);

module.exports = router;