const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const port = 5000
console.log(process.env.DB_USER);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("emajohnStore").collection("products");
  // perform actions on the collection object
  app.post('/addProduct',(req,res)=>{
    const product = req.body;  
    products.insertOne(product)
    .then(result =>{
        console.log(result);
    })
  })
  console.log(process.env.DB_NAME,process.env.DB_PASS,process.env.DB_USER);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})