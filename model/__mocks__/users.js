const {User, users} = require('./data')

const findById = jest.fn((id) => {
    conts [user] = users.filter((el) => String(el._id) === String(id))
    return user
})

const findByEmail = jest.fn((email) => {
    return {}
})

const createUser = jest.fn((userOptions) => {
    return {}
}) 

const updateToken = jest.fn((id, token) => {
    return {}
})

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
    return {}
})

module.exports = {
    findById,
    findByEmail,
    createUser,
    updateToken,
    updateAvatar
}