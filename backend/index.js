import express from "express"
import mysql from "mysql"


const app = express()
const portNum = 3001;

app.use(express.json())

//if there is an auth error than run this code on mysql
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'toor'
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "test"
})

app.get("/", (req, res) => {
  res.json("Backend'e bağlandı.")
})

// "books" tablosundaki verileri json şeklinde alır.
app.get("/books", (req, res)=>{
  const querySQL = "SELECT * FROM books"
  db.query(querySQL, (data,err)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// "books" tablosuna değer ekler.
app.post("/books", (req, res)=>{
  const querySQL = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ]

  db.query(querySQL, [values], (data, err)=>{
    if(err) return res.json(err)
    return res.json("Book başarıyla kaydedildi")
  })
})

app.listen(portNum, () => {
  console.log("Connected to backend port number: " ,portNum)
})