const contacts = [
    {
    _id: "6082ddab8ff28a2c3c59e719",
    name : "Simon Morton",
    email : "dui.Fusce.diam@Donec.com",
    phone : "(233) 738-2360",
    favorite : true
    },
    {
    _id : "6082ddab8ff28a2c3c59e71a",
    name : "Thomas Lucas",
    email : "nec@Nulla.com",
    phone : "(704) 398-7993",
    favorite : false
    }
]

const newContact = {
    name: 'New Contact',
    email: 'new@mail.com',
    phone: '555 555 555',
    favorite: false
}

const User = {
    _id: "60a11c86cd73e8222c7f193f",
    id : "60a11c86cd73e8222c7f193f",
    name : "Guest",
    subscription: "business",
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTExYzg2Y2Q3M2U4MjIyYzdmMTkzZiIsImlhdCI6MTYyMTE3MTc0NSwiZXhwIjoxNjIxMTc4OTQ1fQ.ZzaSlq5E3CymHbLcLRf5n0lOgEqGJoroesGAdY8jBiI",
    idCloudAvatar: null,
    email: "testbot@gmail.com",
    password : "$2a$06$EHkqYXOnlWlVYdlDmZxEZO9NdhxMFMtMYE7cysX3QUdlVA5ZhuttC",
    avatar : "https://s.gravatar.com/avatar/430805388795e17c535a8da751d7e595?s=250",
    createdAt : "2021-05-16T13:22:14.287Z",
    updatedAt : "2021-05-16T13:22:14.287Z"
}

const users = []
users[0] = User

const newUser = { email: 'newUser@mail.com', password: '12345' }

module.exports = {contacts, newContact, User, users, newUser }