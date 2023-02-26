const { Router } = require('express')
const { MessagesController } = require('../controllers/messages.controller')

const router = Router()

router.post('/addMsg', MessagesController.addMessage)
router.post('/getMsg', MessagesController.getAllMessage)

module.exports = router
