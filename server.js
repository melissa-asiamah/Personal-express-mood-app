const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://melissa91:ilovemongodb1@cluster0-6nyz0.mongodb.net/test?retryWrites=true&w=majority"; //mongo atlas url
const dbName = "Personal-Auth";

app.listen(5000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs') //says what templating language to use
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) //client-side code

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('posts').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/mood', (req, res) => {
  db.collection('posts').save({name: req.body.name, color: "black"}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


//======================================================
//PUT
//======================================================


app.put('/moodc', (req, res) => {
  db.collection('posts')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      color: 'red'
    }
  }, {
    sort: {_id: -1}, //searches top to bottom
    upsert: true //it inserts a document if you can't find it
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('posts').findOneAndDelete({mood1: req.body.mood1, mood2: req.body.mood2, mood3: req.body.mood3, mood4: req.body.mood4}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
