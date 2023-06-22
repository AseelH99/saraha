const methods =["body","headers","params","query"];

const validation=(schema)=>
{
  let vaildationArray=[];
  return(req,res,next)=>{
   
    methods.forEach(key=>{
      if(schema[key])
      {
        const validationResult= schema[key].validate(req[key],{abortEarly:false});
        if(validationResult?.error?.details){
          vaildationArray.push(validationResult.error.details);
        }
      }
       } 
      )

      if(vaildationArray.length>0){
        res.json({message:'validation error',err:vaildationArray});
        vaildationArray=[];

      }else{
        next();
      }
    
    
  }
}

module.exports={validation};

