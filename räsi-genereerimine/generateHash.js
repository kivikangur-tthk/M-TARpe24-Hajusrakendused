const bcrypt = require('bcrypt')
const myPassword = 'See on keeruline paroool'

console.time("Time to generate salt")
const salt = bcrypt.genSaltSync(20)
console.log('This is your salt:', salt)
console.timeEnd("Time to generate salt")

console.time("Time to generate hash")
const hashedPassword = bcrypt.hashSync(myPassword, salt)
console.log(myPassword, 'is your password & this is it hashed:', hashedPassword)
console.timeEnd("Time to generate hash")