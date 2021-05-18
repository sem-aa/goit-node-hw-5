const Contacts = require('../model')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: "success",
      code: 200,
      data: {
  contacts
}
    })
  } catch (e){next(e)}
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.getContactById(userId,  req.params.contactId)
      if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found contact'
      })
    }
  } catch(e){next(e)}
}

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.addContact(userId, req.body)
      return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact
      }
    })
  } catch (e) {
    next(e)
  }
}

const deleteContact = async (req, res, next) => {
  try {
     const userId = req.user?.id
    const contact = await Contacts.removeContact(userId, req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'delete contact:',
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found contact'
      })
    }
  } catch(e){next(e);}
}

const updContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found contact'
      })
    }
  } catch(e){next(e)}
}

const updStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateStatusContact(userId, req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        }
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        data: {"message": "missing field favorite"}
      })
    }
  } catch(e){next(e)}
}

const updContactPut = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found contact'
      })
    }
  } catch(e){next(e);}
}

const starter = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'For starter'
    }
  })
}

const pro = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'For pro'
    }
  })
}

const business = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'For business'
    }
  })
}


module.exports = {
  getAll,
  getById,
  updContact,
  updContactPut,
  updStatus,
  deleteContact,
  createContact,
  starter,
  pro,
  business
  }