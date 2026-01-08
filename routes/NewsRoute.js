const express = require('express');
const { JWTAuthMiddleware } = require('../middleware/JWTAuthMiddleware');
const { getNews } = require('../controllers/NewsController');
const router = express.Router();

router.get("/",JWTAuthMiddleware,getNews);

module.exports = router;