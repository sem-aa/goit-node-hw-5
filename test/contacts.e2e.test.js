const request = require('supertest')
const jwt = require('jsonwebtoken')

const app = require('../app')
const { User, contacts, newContact } = require('../model/__mocks__/data')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/index.js')
jest.mock('../model/users.js')

describe('Testing the route api/contacts', () => {
    let idNewContact = null
    describe('Should handle GET request', () => {
        test('should return 200 status for GET: /contacts', async (done) => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts.contacts).toBeInstanceOf(Array)
            done()
        })
        test('should return 200 status for GET: /contacts/:contactId', async (done) => {
            const contact = contacts[0]
            const res = await request(app)
                .get(`/api/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
        test('should return 404 status for GET: /contacts/:contactId', async (done) => {
                const res = await request(app)
                .get(`/api/contacts/6082ddab8ff28a2c3c59d719`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 400 status for GET: /contacts/:contactId', async (done) => {
                const res = await request(app)
                .get(`/api/contacts/6082ddab8ff28a2c3719`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('Should handle POST request', () => {
        test('should return 201 status for POST: /contacts', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').send(newContact)
            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()
            idNewContact = res.body.data.contact._id
            done()
        })
            test('should return 400 status for POST: /contacts wrong field', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({...newContact, test: 1})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
            })
             test('should return 400 status for POST: /contacts without field', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ test: 1})
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('Should handle PUT request', () => {
        test('should return 200 status for PUT: /contacts/:contactId', async (done) => {
            const res = await request(app)
                .put(`/api/contacts/${idNewContact}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({name: 'Ivan'})
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact.name).toBe('Ivan') 
            done()
        })
        test('should return 404 status for PUT: /contacts/:contactId', async (done) => {
            const res = await request(app)
                .put(`/api/contacts/6082ddab8ff28a2c3c59z719`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({phone: '444444444'})
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 404 status for PUT: /contacts/:contactId wrong field', async (done) => {
            const res = await request(app)
                .put(`/api/contacts/1233456`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({rere: 1})
            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
    })
})  


