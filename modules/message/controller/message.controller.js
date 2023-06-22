const { userModel } = require("../../../DB/model/user.model");
const {messageModel}=require("../../../DB/model/message.model");
const e = require("express");
const sendmessage= async(req,res)=>{
    const {RecivedId}= req.params;
    const {RecivedMessage}= req.body;
    try{ const user = await userModel.findById(RecivedId);
        if(!user){
            res.json({"message":"user not found"});
        }else{
            const newmessage = new messageModel({text:RecivedMessage,recivedId:RecivedId});
            const savedMessage = await newmessage.save();
            res.json({"message":"success",savedMessage});
        }}
        catch(err){
            res.json({"message":"catch error "})
        }

   
}

const messagesList= async(req,res)=>{

    const messages = await messageModel.find({recivedId:req.user._id});
    res.json({"message":"success",messages});

}
const deleteMessage= async(req,res)=>{

    const {id}=req.params;
    const recivedId=req.user._id;

    const message = await messageModel.findOneAndDelete({_id:id,recivedId:recivedId});
    if(!message){
        res.json({"message":"fail to delete message"});
    }else{
        res.json({"message":"success"});
    }
}
module.exports={sendmessage,messagesList,deleteMessage};