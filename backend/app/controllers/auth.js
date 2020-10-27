const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const models = require('../models')

//user
exports.users = async (req,res) => {
  try{
      const users = await models.User.findAll({
        where: {id: { $not: req.userData.id}}
      })
      res.json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}

//register
exports.register = async (req,res) => {
  try{
    const newUser = await models.User.create(req.body)
    const token = jwt.sign({id:newUser.id,username:newUser.username,email:newUser.email},secret_key)
    res.json({userData:newUser,token:token})
  } catch(error){
    res.status(400).json({
      message: error.fields.email? 'email is already':'username is already'
    })
  }
}

//login
exports.login = async (req,res) => {
  
  req.check('username').isEmail()

  const errors = req.validationErrors()
  if (errors){
    try{
      const user =  await models.User.findOne({
                            where:{
                              username:req.body.username
                            }
                          })
      const compare = bcrypt.compareSync(req.body.password, user.password)
      if (compare){
        const token = jwt.sign({id:user.id,username:user.username,email:user.email},secret_key)
        res.json({userData:user,token:token})
      } else {
        res.status(400).json({message: 'Password not valid'})
      }
    } catch(error){
      res.status(400).json({
        message: 'Username not yet registered'
      })
    }
  } else {
    try{
      const user =  await models.User.findOne({
                            where:{
                              email:req.body.username
                            }
                          })
      const compare = bcrypt.compareSync(req.body.password, user.password)
      if (compare){
        const token = jwt.sign({id:user.id,username:user.username,email:user.email},secret_key)
        res.json({userData:user,token:token})
      } else {
        res.status(400).json({message: 'Password not valid'})
      }
    } catch(error){
      res.status(400).json({
        message: 'Email not yet registered'
      })
    }
  }

}