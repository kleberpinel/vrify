const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://app@localhost:5432/vrify')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send("Server is up!")
})

app.get('/customers', async (req, res) => {
  const records = await db.any('SELECT * FROM customers')
  return res.send({ customers: records })
})

app.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const record = await db.one('SELECT * FROM customers WHERE id = $1', id)
  res.send({ customer: record })
})

app.get('/customers-with-address', async (req, res) => {
  // We could move this to a Model classes so we can have things more organized
  // and tested by domains
  const records = await db.any(`
    SELECT
      c.ID,
      c.NAME
    FROM
      Customers c
    INNER JOIN
      Customer_Addresses ca
      ON c.ID = ca.CUSTOMER_ID
  `)
  return res.send({ customers: records })
})

app.post('/customers', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).json({ error: 'Name is a required field.' });
  }

  await db.none('INSERT INTO customers(name) VALUES($1)',name);
  res.send({ success: true })
})


module.exports = app
