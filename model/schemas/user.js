const mongoose = require('mongoose')
const gravatar = require('gravatar')
const {Schema, model} = mongoose
const bcrypt = require('bcryptjs')
const {Status} = require('../../helper/constant')
const SALT_FACTOR = 6

const userSchema = new Schema(
    {
  name: {
    type: String,
    minlength: 2,
    default: 'Guest'
        },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
      unique: true,
      validate(value) {
          const re = /\S+@\S+\.\S+/
          return re.test(String(value).toLocaleLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: [Status.STARTER, Status.PRO, Status.BUSINESS],
    default: Status.STARTER
  },
  token: {
    type: String,
    default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {s: 250}, true)
      }
    },
    idCloudAvatar: {
        type: String,
        default: null
      }
    }, {
        versionKey: false,
        timestamps: true
}
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(SALT_FACTOR)
this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User
