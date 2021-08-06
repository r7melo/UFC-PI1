const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cruddatabase"
})

app.use(cors())
app.use(express.json())
/* app.use(bodyParser.urlencoded({extended:true})) */


app.post("/api/cadastroUsuario", (req, res) => {

    const userName = req.body.userName
    const userPass = req.body.userPass

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)"
    db.query(sqlInsert, [userName, userPass], (err, result) => {
        res.send(result)
    })
})

app.post("/api/verificaitionLogin", (req, res) => {

    const userName = req.body.userName
    const userPass = req.body.userPass

    const sqlInsert = "SELECT * FROM movie_reviews WHERE ?=movieName AND ?=movieReview"
    db.query(sqlInsert, [userName, userPass], (err, result) => {
        res.send(result)
    })
})


app.listen(3007 , () => {
    console.log("running on port 3007");
})

