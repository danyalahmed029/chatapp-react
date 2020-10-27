const models = require('../models')

//users
exports.index = async (req,res) => {

  const users = await models.User.findAll({
                        where: {
                          id: {[req.Op.notIn]:[req.userData.id]}
                        }
                      })
  res.json(users)
}

//sendChat
exports.send = async (req,res) => {

  req.check('body','Chat is required').not().isEmpty()

  const errors = req.validationErrors()
  if (errors){
    res.status(400).json(errors)
  } else{
    try{
        const results = await models.Chat.create({
          body: req.body.body,
          from:req.userData.id,
          to:req.body.to
        })
        res.io.emit('messages',{receiver:req.body.to,sender:req.userData.id,results})
        res.json(results)
    } catch(error){
        res.json(error)    
    }
  }

}

//showChat
exports.show = async (req,res) => {
  console.log("show",req.params)
  const chat = await models.Chat.findAll({
                      where: {
                        [req.Op.or]: [
                          {
                            from: req.userData.id,
                            to: req.params.id
                          },{
                            from: req.params.id,
                            to: req.userData.id
                          }
                        ]
                      },
                      include:[
                        {
                        model: models.User,
                        as : 'fromUser'
                      },
                      {
                        model: models.User,
                        as : 'toUser'
                      }
                    ],
                    })
  res.json(chat)
}

//showGlobalChat
exports.showglobalChat = async (req,res) => {
  const globalChat = await models.GlobalMessage.findAll({
    include:[{
      model: models.User,
      as : 'fromUser'
    }]
  })
  res.json(globalChat)
}

// sendGlobalChat
exports.sendGlobalChat = async (req,res) => {
  req.check('body','Chat is required').not().isEmpty()

  const errors = req.validationErrors()
  
  if (errors){
    res.status(400).json(errors)
  } else{
    try{
        const results = await models.GlobalMessage.create({
          body: req.body.body,
          from:req.userData.id
        })
        res.io.emit('messages',{sender:req.userData.id,results})
        res.json(results)
    } catch(error){
      console.log("catch",JSON.stringify(error))
        res.json(error)    
    }
  }

}