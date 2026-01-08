const express = require('express');
const { JWTAuthMiddleware } = require('../middleware/JWTAuthMiddleware');
const { getPreferences, updatePreferences } = require('../controllers/PreferenceController');
const router = express.Router();

router.get("/",JWTAuthMiddleware,getPreferences)
router.put("/",JWTAuthMiddleware,updatePreferences)

module.exports = router;