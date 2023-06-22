const multer =require('multer');
const {nanoid}=require('nanoid');
const HME =(error,req,res,next)=>{
    if(error){
        res.status(400).json({message:'multer error',error});
    }else{
        next();
    }
}
function myMulter(customValidation){
         const storge =multer.diskStorage({

            destination:function(req,file,cb){
                cb(null,"upload/profile")
            },
            filename:function(req,file,cb){
            cb(null,nanoid()+"_"+Date.now()+"_"+file.originalname);
            } 
         });
         function fileFilter(req,file,cb){
           if(customValidation.includes(file.mimetype)){
            cb(null,true);
           }else{
            cb("invalid file type",false);
           }
         }
         const upload =multer({dest:'upload',fileFilter,storge});
         return upload;
}
module.exports={myMulter,HME}; 