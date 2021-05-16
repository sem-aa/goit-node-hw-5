const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{3,30}$')).required(),
})

const schemaQueryContact = Joi.object({
    sortBy: Joi.string().valid('name', 'subscription', 'id', 'phone').optional(),
    sortByDesc: Joi.string().valid('name', 'subscription', 'id', 'phone').optional(),
    filter: Joi.string().optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    offset: Joi.number().integer().min(1).optional(),
    favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{3,30}$')).optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        console.log(err);
        next({status: 400, message: err.message.replace(/"/g, "'")})
    }
}

module.exports = {
    validQuery: async (req, res, next) => {
        return await validate(schemaQueryContact, req.query, next)
    },
    validCreateContact: async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
    validUpdateContact: async (req, res, next) => {
        return  await validate(schemaUpdateContact, req.body, next)
    },
    validationObjectId: async (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.contactId)){
            return next({status: 400, message: 'Inavalid Object Id'})
        } next()
    },
    
}
