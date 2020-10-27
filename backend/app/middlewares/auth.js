const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

exports.register = (req,res,next) => {

  req.check('name','name is required').not().isEmpty()
  req.check('username','username is required').not().isEmpty()
  // req.check('password','Password min 8').isLength({min:8}).equals(req.body.confirmPassword).withMessage('Confirm password is different')

  const error = req.validationErrors()
  if(error){
    res.status(400).json(error)
  } else{
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
    next()
  }

}

exports.checkAuth = (req,res,next) => {
  try{
    const token = req.headers.authorization
    const decoded = jwt.verify(token,secret_key)
    req.userData = decoded
    next()
  } catch(error){
    console.log("checkAuth",JSON.stringify(error))
    res.status(400).json({message: 'Auth failed'})
  }
}