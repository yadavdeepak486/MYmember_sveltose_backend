const express = require('express');
const router = express.Router();
const { create,remove,edit } = require('../controllers/event')

router.post('/eventcreate/:appoinmentId', create)

router.delete('/eventdelete/:eventId', remove)

router.put('/eventedit/:eventId', edit)

module.exports = router;