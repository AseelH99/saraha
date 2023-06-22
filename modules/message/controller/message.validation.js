const Joi = require('joi');

const sendmessage = {
    params:Joi.object().required().keys({
        RecivedId:Joi.string().min(24).max(24).required()
    }),
    
    body:Joi.object().required().keys({
        RecivedMessage:Joi.string().min(5).max(400).required()
    })
}
module.exports={sendmessage};