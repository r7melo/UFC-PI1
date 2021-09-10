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

app.post('/add-torneio', (req, res) => {
    let data = req.body;
    console.log(data)
    db.query(`INSERT INTO torneio VALUES (?, ?, NULL, ?)`,[data.nome_torneio, data.premiacao, data.quant_times],(err, result) => {
        if(err) console.log(err);
       
        if(result){
            res.status(200).json({message: 'Salvo com sucesso'});
        }
    })
})

app.get('/torneios',  (req, res) => {
    let obj = {}
    db.query('SELECT * FROM torneio',(err, result) => {
        if(err) console.log(err)

        if(result){
            obj.torneios = result
            res.status(200).json(obj);
        }
    })
})

app.post('/delete-torneio',(req, res) => {
    let {id} = req.body

    db.query(`DELETE FROM torneio WHERE cod_torneio=${id}`, (err, result) => {
        if(err) console.log(err)

        if(result){
            res.status(200).json({message: 'sucesso'})
        }
    })
})

app.get('/torneio-by-id/:id', (req, res) => {
    let {id} = req.params
    let obj = {}

    db.query(`SELECT * FROM time WHERE cod_torneio=${id} ORDER BY cod_torneio ASC`, (err, result) => {
        if(err) console.log(err)

        if(result){
            obj.torneio = result
            res.status(200).json(obj)
        }
    })
})

app.post('/add-equipe', (req, res) => {
    let { nome_time } = req.body
    let { sigla } = req.body
    let { cod_torneio } = req.body

    db.query('INSERT INTO time VALUES (?, ?, NULL, ?, 0)',[nome_time, sigla, cod_torneio],(err, result) =>{
        if(err) console.log(err)

        if(result){
            res.status(200).json({message: 'sucesso'})
        }
    })
})

app.get('/equipes', (req, res) => {
    let obj = {}

    db.query('SELECT * FROM time ORDER BY cod_time ASC', (err, result) => {
        if(err) console.log(err)

        if(result){
            obj.equipes = result

            res.status(200).json(obj);
        }
    })
})
app.post('/delete-equipe/:id', (req, res) => {
    let {id} = req.params
    console.log(req.params)
    db.query(`DELETE FROM time WHERE cod_time=${id}`, (err, result) => {
        if(err) console.log(err)

        if(result){
            res.status(200).json({message: 'sucesso'})
        }
    })
})

app.post('/atualiza-time', (req, res) => {
    console.log(req.body) 
    let {quant_vitorias} = req.body;
    let {id} = req.body;
    let newQuantVitorias = Number(quant_vitorias)+1;
    db.query(`UPDATE time SET quant_vitorias=${newQuantVitorias} WHERE cod_time=${id}`,(err, result) => {
        if(err) console.log(err)

        if(result){
            res.status(200).json({message:'sucesso'})
        }
    })
})

app.listen(3007 , () => {
    console.log("running on port 3007");
})

