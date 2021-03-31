const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const port = 5000
 console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err);
  const productsCollection = client.db("emajohnStore").collection("products");
  app.post('/addProduct',(req,res)=>{
    const products = req.body;
     console.log(products); 
    productsCollection.insertMany(products)
    .then(result =>{
        console.log(result);
        console.log(result.insertedCount);
        res.send(result.insertedCount);
    })
  })
  app.get('/products',(req,res)=>{
      productsCollection.find({})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  })
  app.get('/product/:key',(req,res)=>{
    productsCollection.find({key: req.params.key})
    .toArray((err,documents)=>{
        res.send(documents[0]);
    })
})
//   console.log(process.env.DB_NAME,process.env.DB_PASS,process.env.DB_USER);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})