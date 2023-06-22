const Joi = require('joi');

const singup = {
  
     body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'any.required':'plz enter your name',
            'string.empty':'the name is requiered'

        }),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(20).required(),
        //Cpassword:Joi.string().valid(Joi.ref('password')).required()
     })
}

const singin = {
    body:Joi.object().required().keys({
        email:Joi.string().email().required().messages({
        'any.required':'plz enter your email',
    }),
    password:Joi.string().required(),})
 
    
}
module.exports={singup,singin};