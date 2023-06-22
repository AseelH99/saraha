const {userModel}=require('../../../DB/model/user.model');
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const {nanoid}=require('nanoid');
const { sendEmail } = require('../../../services/email');

const singup= async(req,res)=>{

    const{name,email,password}= req.body;
    const user = await userModel.findOne({email:email});

    if(user){
        res.json({"message":"email is exist"});
    }else{
        let hashpassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
        const newUser= new userModel({email,userName:name,password:hashpassword});
        const savedUser = await newUser.save();
        if(!savedUser){
            res.json({"message":"fail to singup"});
        }else{
            let token = await jwt.sign({id:savedUser._id},process.env.CONFEMAILTOKEN,{expiresIn:'1h'});
            let ref_token = await jwt.sign({id:savedUser._id},process.env.CONFEMAILTOKEN);
            let message =`
            <a href ="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}"> verfiy email </a>`;
            let ref_message =`
            <a href ="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/ref_token/${ref_token}"> resend verfiy email </a>`;
            await sendEmail(email,'Confirm Email',`${message}<br />${ref_message}`);
            res.json({"message":"success"});
        }
    }

}
const confEmail= async (req,res)=>{
    try{
        const {token}= req.params;
        const decoded = jwt.verify(token,process.env.CONFEMAILTOKEN);
        if(!decoded){
            res.json({"message":"invalid token paylode"});
        }else{
            let user = await userModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false },{confirmEmail:true});
        }
    }catch(err){
        res.json({"message":"error",err});
    }
    


}


const singin = async (req,res)=>{

const {email,password}=req.body;
const user = await userModel.findOne({email});
if(!user){
    res.json({"message":"invalid user account"});
}else{
    if(!user.confirmEmail){
        res.json({"message":"plz verfiy your email"});
    }else{
         const match = await bcrypt.compare(password,user.password);
         if(!match){
            res.json({"message":"invalid user account"});
         }else{
            const token =  jwt.sign({id:user._id},process.env.INPUTTOKEN,{expiresIn:60*60*24});
            res.json({"message":"success",token});
                
        }
}

}}
const SendCode =async(req,res)=>{
    const{email}=req.body;
    const user = await userModel.findOne({email}).select('email');
    if(!user){
        res.json({"message":"invalid account"});
    }
    else{
        const code = nanoid();
       await sendEmail(email,'Forget Password',`verfiy code :${code}`);
       updateUser= await userModel.updateOne({id:user._id},{sendCode:code});
       if(!updateUser){
        res.json({"message":"invalid update"});

       }else{
        res.json({"message":"success "});

       }
    }
}

const forgetPassword=async (req,res)=>{

    const{email,code,newPassword}=req.body;
    if(code==null){res.json({"message":"fail"});}
    else{
        let hashpassword = await bcrypt.hash(newPassword,parseInt(process.env.SALTROUND));
        const user = await userModel.findOneAndUpdate({email:email,sendCode:code},{password:hashpassword,sendCode:null});
        if(!user){
            res.json({"message":"fail"});
        }else{
            res.json({"message":"success"});
        }
    }
    
}
 const refreshToken =async(req,res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.CONFEMAILTOKEN);
    if(!decoded?.id){
        res.json({"message":"inavalid token payload"});
    }
    else{
        const user = await userModel.findById(decoded.id).select('email');
        if(!user)
        {
            res.json({"message":"inavalid user account"});

        }else{
            let token = await jwt.sign({id:user._id},process.env.CONFEMAILTOKEN,{expiresIn:60*5});
            let message =`
            <a href ="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}">
             verfiy email </a>`;
             await sendEmail(user.email,'Confirm Email',message);
             res.json({"message":"success"});
        }
    }

 }
 const qrcodeAllusers=async(req,res)=>{

    let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/getAllusers`
    QRCode.toDataURL(link, function (err, url) {
       res.json(url)
      })
 }
 const getAllusers= async(req,res)=>{
    let user = await userModel.find({});
    res.json(user);
 }
module.exports={getAllusers,singup,confEmail, singin,SendCode,forgetPassword,refreshToken,qrcodeAllusers};