const router = require('express').Router();
const { auth } = require('../../middleware/auth');
const { validation } = require('../../middleware/validation');
const messageController=require('../message/controller/message.controller');
const messageValidation=require('./controller/message.validation');
router.post('/:RecivedId',validation(messageValidation.sendmessage),messageController.sendmessage);
router.get('/messages',messageController.messagesList);
router.delete('/deletemessages/:id',auth(),messageController.deleteMessage);
module.exports = router; 
