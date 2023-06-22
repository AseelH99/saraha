const router = require('express').Router();
const { userModel } = require('../../DB/model/user.model');
const { validation } = require('../../middleware/validation');
const authController = require('../auth/controller/auth.controller');
const authValidation =require('./controller/auth.validation');

router.post('/singup',validation(authValidation.singup),authController.singup);
router.get('/confirmEmail/:token',authController.confEmail);
router.get('/ref_token/:token',authController.refreshToken);
router.get('/singin',validation(authValidation.singin),authController.singin);
router.get('/sendcode',authController.SendCode);
router.get('/forgetpassword',authController.forgetPassword);
router.get('/qrcode_allusers',authController.qrcodeAllusers);
router.get('/getAllusers',authController.getAllusers);
module.exports = router;