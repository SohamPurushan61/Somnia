const express = require('express');
const { uploadDream, getDreams } = require('../controllers/dreamController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/upload', authenticateJWT, uploadDream);
router.get('/getDreams/:userAddress', authenticateJWT, getDreams);

module.exports = router;
