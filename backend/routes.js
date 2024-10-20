const router = require('express').Router();
const authController = require('./controllers/auth-controller.js')

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);

module.exports = router;