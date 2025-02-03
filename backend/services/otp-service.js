const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        try {
            const message = await twilio.messages.create({
                to: phone,
                from: process.env.SMS_FROM_NUMBER,
                body: `Your codershouse OTP is ${otp}`,
            });
            console.log(`OTP sent to ${phone}, Message SID: ${message.sid}`);
        } catch (error) {
            console.error(`Error sending OTP: ${error.message}`);
            throw error; // Throw the error so it can be caught by higher levels
        }
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
