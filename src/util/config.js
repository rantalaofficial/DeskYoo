require('dotenv').config()

let DBADDRESS = process.env.DBADDRESS
let PORT = process.env.PORT

module.exports = {
    PORT,
    DBADDRESS
}
