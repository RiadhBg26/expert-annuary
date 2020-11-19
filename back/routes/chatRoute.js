const express = require('express');
const router = express.Router();
const Chat = require('../models/chatModel');
const Expert = require('../models/expertModel')
const Company = require('../models/companyModel')


router.get('', function (req, res) {
   Chat.find()
      .select(' -__v ')
      // .populate('specialty', {'_id ': 0})
      .populate({ path: 'sender', populate: { path: 'name', model: 'expert', select: ' _id username' } })
      .populate({ path: 'reciepent', populate: { path: 'name', model: 'company', select: '_id name' } })
      .exec(function (err, data) {
         res.send({
            count: data.length,
            chats: data
         })
         console.log(data);
      });
})

router.post('/', function (req, res) {
   Chat.create(req.body).then(async function (chat) {
      // console.log(message);
      // chat.message.value.push(req.body.message)
      let expert = await Expert.findById(chat.sender.name)
      chat.sender.message.value.push(req.body.message)
      chat.sender.message.time = req.body.time
      expert.chatBox.push(chat._id)
      console.log(chat);
      await expert.save()

      let company = await Company.findById(chat.reciepent.name)
      chat.reciepent.message.value.push(req.body.message)
      chat.sender.message.time = req.body.time
      company.chatBox.push(chat._id)
      await company.save()
      
      chat.save()
      console.log(chat);
      res.send(chat)
   });
});

router.put('/:id', function (req, res) {
   // let companyId = {_id: req.params.id};
   Chat.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (chat) {
      // chat.sender.message.value.push(req.body.message)
      // chat.sender.message.time = req.body.time
      // chat.reciepent.message.value.push(req.body.message)
      // chat.reciepent.message.time = req.body.time
      console.log('edited chat => ', chat);
      chat.save()
      res.send(chat)
   });
});


module.exports = router