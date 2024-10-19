const otpService = require('../services/otp-service.js')
const hashService = require('../services/hash-service.js')

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }

        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 2; //2min
        const expires = Date.now() + ttl; //time when the otp will expire (time 2minutes from now)
        const data = `${phone}.${otp}.${expires}`; //concatenated
        const hash = hashService.hashOtp(data);

    res.json({hash: hash});
  }
}

module.exports = new AuthController();
