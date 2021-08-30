const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pi_playoffcsgo"
})

export default db;