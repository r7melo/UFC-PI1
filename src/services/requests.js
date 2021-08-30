const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pi_playoffcsgo"
})

app.use(cors())
app.use(express.json())
/* app.use(bodyParser.urlencoded({extended:true})) */


app.post("/login", (req, res) => {
    console.log(req.body)
    const userEmail = req.body.userEmail
    const userPass = req.body.userPass

    db.query(`SELECT * FROM usuario WHERE email="${userEmail}" AND senha="${userPass}"`,(err, result) => {
        if(err) console.log(err);
        if(result){
            console.log(result.length)
            
            if(result.length > 0){
                let obj = {
                    id: result[0].cod_usuario,
                    userName: result[0].nome_usuario,
                    userEmail: result[0].email
                }

                res.status(200).json({
                    message: 'ok',
                    obj
                })
            }
            else{
                res.status(500).json({
                    message: 'error'
                })
            }
        }       
    })   
})


app.post("/cadastro", (req, res) => {

    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const userPass = req.body.userPass
    const userBirthDay = req.body.userBirthDay

    const sqlInsert = "INSERT INTO usuario VALUES (?, ?, NULL, ?, ?, NULL, NULL)"
    db.query(sqlInsert, [userName, userEmail, userBirthDay, userPass ], (err, result) => {
        if(err) console.log(err);

        res.send(result)
    })
})

app.post("")

app.listen(3007 , () => {
    console.log("running on port 3007");
})

