const mongoose = require('mongoose') 
const { Schema, model, SchemaTypes } = mongoose
  const mongoosePaginate = require('mongoose-paginate-v2')

  const contactSchema = new Schema({
      name: {
          type: String,
          require: [true, 'Set name for contact']
      },
      email: {
          type: String,
          min: 3,
          max: 300
      },
       phone: {
          type: String,
          min: 5,
          max: 15,
           require: [true, 'Set phone number for contact']
      },
      favorite: {
          type: Boolean,
          default: false
      },
      features: {
          type: Array,
          set: (data)=>(!data ? [] : data),
          get: (data)=>(data.sort())
      },
         owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  }, {
      versionKey: false,
      timestamps: true,
      toObject: { virtuals: true },
      toJSON: {virtuals:true}
  })

contactSchema.path('name').validate((value) => {
    const re = /[A-Z]\w+/
    return re.test(String(value))
})

contactSchema.virtual('strNameEmail').get( function () {
    return `${this.name} ${this.email} name`
})

contactSchema.plugin(mongoosePaginate)

const Contact = model('contacts', contactSchema)
  
module.exports = Contact