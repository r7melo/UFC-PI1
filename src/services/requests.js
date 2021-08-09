const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
requeri("database.js")

app.use(cors())
app.use(express.json())
/* app.use(bodyParser.urlencoded({extended:true})) */


app.post("/login", (req, res) => {

    const userEmail = req.body.userEmail
    const userPass = req.body.userPass

    const sqlInsert = "SELECT nome FROM usuario WHERE ?=email AND ?=senha"
    db.query(sqlInsert, [userEmail, userPass], (err, result) => {
        res.send(result)
    })
})


app.post("/cadastro", (req, res) => {

    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const userPass = req.body.userPass

    const sqlInsert = "INSERT INTO usuario VALUES (NULL, ?, ?, ?)"
    db.query(sqlInsert, [userName, userEmail, userPass], (err, result) => {
        res.send(result)
    })
})



app.listen(3007 , () => {
    console.log("running on port 3007");
})

