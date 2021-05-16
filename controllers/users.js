const jwt = require('jsonwebtoken')
const fs = require('fs/promises')

const path = require('path')
const jimp = require('jimp')
const cloudinary = require('cloudinary').v2
// const {promisify} = require('util')

const Users = require('../model/users')
const { HttpCode } = require('../helper/constant')

require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,

    
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
})

// const uploadToCloud = promisify(cloudinary.uploader.upload)


const register = async (req, res, next) => {
    const {  email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already use',
            
        })
    }
    try {
        const newUser = await Users.createUser(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                subscription: newUser.subscription,
                avatar: newUser.avatar
            }
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not correct email or password'
        })
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {token}
    })
}
 
const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const updateAvatar = async (req, res, next) => {
    const { id } = req.user
    const avatarUrl = await saveAvatarUser(req)
    await Users.updateAvatar(id, avatarUrl)
    // const {idCloudAvatar, avatarUrl} = await saveAvatarUserCloud(req)
    // await Users.updateAvatar(id, avatarUrl, idCloudAvatar)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {avatarUrl}
    })
}
// Аватар облачное хранение
// const saveAvatarUserCloud = async (req) => {
//     const pathFile = req.file.path
//     const { public_id: idCloudAvatar , secure_url: avatarUrl} = await uploadToCloud(pathFile, {
//         public_id: req.user.idCloudAvatar?.replace('Avatars/', ''),
//         folder: 'Avatars',
//         transformation: {width: 250, height: 250, crop: 'pad' }
//     })
//     await fs.unlink(pathFile)
//     return {idCloudAvatar, avatarUrl}
// }

// Аватар статическое хранение
const saveAvatarUser = async (req) => {
    const FOLDER_AVATARS = process.env.FOLDER_AVATARS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
    const img = await jimp.read(pathFile)
    await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile)
    try {
        await fs.rename(
            pathFile,
            path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar))
    } catch (e) {
        console.log(e.message)
    }
    console.log(req.user.avatar)
    const oldAvatar = req.user.avatar
    if (oldAvatar.includes(FOLDER_AVATARS)) {
       await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
    }
    return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
}

module.exports = {
    register,
    login,
    logout,
    updateAvatar
}
