const { userModel } = require("../DB/model/user.model");
var jwt = require('jsonwebtoken');
const auth =()=>{
    return async(req,res,next)=>{
          let {token} = req.headers;
        
          if(!token.startsWith(process.env.AUTHBERRARTOKEN)){
            res.json({"message":"invalid token"});
          }else{
            token = token.split(process.env.AUTHBERRARTOKEN)[1];
             const decoded = await jwt.verify(token,process.env.INPUTTOKEN);

             if(decoded){
                 const user = await userModel.findById(decoded.id);
                 req.user=user;
                 //res.json({"message":"success",decoded});
                 next();
             }else{
                res.json({"message":"invalid token"});
             }
          }
    }
}
module.exports={auth};