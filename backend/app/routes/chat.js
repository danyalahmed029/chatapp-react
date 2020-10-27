const express = require('express')
const router = express.Router()

const chat = require('../controllers/chat')
const middleware = require('../middlewares/auth')

router.get('/api/users',middleware.checkAuth,chat.index)
router.get('/api/global',middleware.checkAuth,chat.showglobalChat)
router.post('/api/global',middleware.checkAuth,chat.sendGlobalChat)
router.post('/api/messages',middleware.checkAuth,chat.send)
router.get('/api/messages/:id',middleware.checkAuth,chat.show)

module.exports = router