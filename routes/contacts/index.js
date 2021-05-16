const express = require('express')
const router = express.Router()
const { validCreateContact, validUpdateContact, validationObjectId, validQuery } = require('./valid-contacts')
const cntrl = require('../../controllers/contacts')
const guard = require('../../helper/guard')
const role = require('../../helper/role')
const {Status} = require('../../helper/constant')


router.get('/', guard, validQuery, cntrl.getAll)
router.post('/', guard, validCreateContact, cntrl.createContact)

router.get('/starter', guard, role(Status.STARTER), cntrl.starter)
router.get('/pro',guard, role(Status.PRO), cntrl.pro)
router.get('/business',guard, role(Status.BUSINESS), cntrl.business)

router.get('/:contactId', guard, validationObjectId, cntrl.getById)
router.delete('/:contactId', guard, cntrl.deleteContact)
router.patch('/:contactId', guard, validUpdateContact, cntrl.updContact)
router.put('/:contactId', guard ,validUpdateContact, cntrl.updContactPut)

router.patch('/:contactId/favorite', guard, cntrl.updStatus)



module.exports = router
