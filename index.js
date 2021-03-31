const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 8080
const MongoClient = require('mongodb').MongoClient;



app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World Node!Hi')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqpfg.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log(err);
    const productCollection = client.db("gentsGlamor").collection("products");

    app.get('/products', (req, res) => {

    })

    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        console.log("new product", newProduct);
        productCollection.insertOne(newProduct)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount > 0)
            })

    })

});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})