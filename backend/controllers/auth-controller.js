const otpService = require("../services/otp-service.js");
const hashService = require("../services/hash-service.js");
const userService = require('../services/user-service.js');
const tokenService = require('../services/token-service.js');

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" });
    }

    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2; //2min
    const expires = Date.now() + ttl; //time when the otp will expire (time 2minutes from now)
    const data = `${phone}.${otp}.${expires}`; //concatenated
    const hash = hashService.hashOtp(data);

    //send otp
    try {
      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failure during sending message" });
    }
  }

  async verifyOtp(req,res){
    const {otp, hash, phone} = req.body;
    if(!otp || !hash || !phone){
      res.status(400).json({message : 'All fields are required!'})
    }

    const [hashedOtp, expires] = hash.split('.');
    if(Date.now() > +expires){
      res.status(400).json({message : 'OTP expired!'})
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);
    if(!isValid){
      res.status(400).json({message: 'Invalid OTP!'})
    }
    let user;
    // let accessToken;
    // let refreshToken;

    try{
       user = await userService.findUser({phone});
       if(!user){
        user = await userService.createUser({phone});
       }
    }catch(err){
       console.log(err);
       res.status(500).json({message: 'DB error'})
    }
     
    //generate jwt tokens
    const {accessToken, refreshToken} = tokenService.generateTokens()
  }
}

module.exports = new AuthController();
