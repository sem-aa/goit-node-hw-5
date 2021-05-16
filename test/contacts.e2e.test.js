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
    describe('Should handle GET request', () => {
        test('should return 200 status for GET: /contacts', async (done) => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts).toBeInstanceOf(Array)
            done()
        })
    })
})
