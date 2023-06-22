const { userModel } = require("../../../DB/model/user.model");
let bcrypt = require('bcryptjs');
const updatepassword = async(req,res)=>{
try{ 

const{oldPassword,newPassword}=req.body;
const user=await userModel.findById(req.user._id);
const match = await bcrypt.compare(oldPassword,user.password)
if(!match){
    res.json({"message":"incorrect input password "})
}
else{
 
    let hashpassword = await bcrypt.hash(newPassword,parseInt(process.env.SALTROUND));
    updateuser = await userModel.findByIdAndUpdate(req.user._id,{password:hashpassword});
    if(!updateuser){
        res.json({"message":"fail to update"});
    }else{
        res.json({"message":"success"});
    } 
}
}

catch(err){
    res.json({"message":"catch error ",err});
}
}
const uploadProfilePic= async(req,res)=>{
    if(!req.file){
        res.status(400).json({message:"plz upload image"});
    }
    else{
        
        console.log(req.file);
     
        
        // const imageUrl= req.file.destination+'/'+req.file.filename;
        // await userModel.findOneAndUpdate({_id:req.user._id},{profilePic:imageUrl});
        //  res.status(200).json({"message":imageUrl});
    }
     
}

module.exports={updatepassword,uploadProfilePic};