require('dotenv').config()
const express = require('express')
const massive = require('massive')
const products_controller = require('./controllers/products_controller')


const { SERVER_PORT, CONNECTION_STRING } = process.env

const app = express()

app.use(express.json())

app.get('/api/products', products_controller.getAll)
app.get('/api/products/:id', products_controller.getOne)
app.put('/api/products/:id', products_controller.update)
app.post('/api/products/', products_controller.create)
app.delete('/api/products/:id', products_controller.delete)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log('db rdy')
    app.listen(SERVER_PORT, () => {
      console.log(`${SERVER_PORT} is live.`);
    });
  })
  .catch(err => console.log(err));

app.use(express.json());

