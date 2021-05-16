const role = require('../helper/role')
const { HttpCode, Status } = require('../helper/constant')
const {User} = require('../model/__mocks__/data')


describe('Unit test: helper/role', () => {
    const req = { user: User }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((respone) => respone)
    }
    const next = jest.fn()

    test('run function with right role', () => {
        role(Status.BUSINESS)(req, res, next)
        expect(next).toHaveBeenCalled()
    })
    test('run function with wrong role', () => {
        const result = role(Status.STARTER)(req, res, next)
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.FORBIDDEN)
        expect(result.message).toEqual('Access is denied')
    })
})
