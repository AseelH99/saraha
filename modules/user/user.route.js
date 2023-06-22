const { auth } = require('../../middleware/auth');
const { myMulter, HME } = require('../../services/multer');
const userControler=require('./controller/user.controller');
const router = require('express').Router();

router.get('/',auth(),(req,res)=>{

    let user=req.user;
    res.json({"message":"user page",user});
})
router.patch('/updatepassword',auth(),userControler.updatepassword);
router.patch('/profile/pic',auth(),myMulter(['image/png','image/jpeg']).single('image'),HME,userControler.uploadProfilePic);
module.exports = router;