const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.post('/api/users/register',middleware.register,auth.register)
router.post('/api/users/login',auth.login)
router.get('/users',middleware.checkAuth,auth.users)

module.exports = router